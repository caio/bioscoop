#!/usr/bin/env python
# coding:utf-8

import sys
import pyjsonrpc
import os
import requests
import multiprocessing
import logging
import json
import click

from urllib import unquote
from glob import glob
from getpass import getpass


BASEDIR = os.path.dirname(os.path.realpath(__file__))
THUMBNAIL_CACHE = os.path.join(BASEDIR, ".cache/thumbnails")
THUMBNAIL_DIR   = os.path.join(BASEDIR, "app/img/thumbs")

logging.basicConfig()
logger = logging.getLogger(__name__)

@click.command()
@click.option('--host', help='XBMC server address', prompt=True, default='192.168.178.25')
@click.option('--username', help='Username for logging in on XBMC', prompt=True)
@click.option('--password', help='Password for logging in on XBMC', prompt=True, hide_input=True)
@click.option('--processes', help='Number of processes to use during download/conversion', type=click.INT, default=1)
@click.option('--output', help='Name of the file to output the library as JSON', default='data.js')
@click.option('--pretty', help='Prettify the JSON output', is_flag=True)
@click.option('--debug', help='Enable debugging messages', is_flag=True)
def update_library(host, username, password, processes, output, pretty, debug):

    if debug:
        logger.setLevel(logging.DEBUG)

    jsonrpc_endpoint = "http://{}/jsonrpc".format(host)

    logger.debug("Connecting to {} with {}:{}".format(jsonrpc_endpoint,
                                                      username, password))

    global jsonclient
    jsonclient = pyjsonrpc.HttpClient(url=jsonrpc_endpoint,
                                      username=username,
                                      password=password)
    response = jsonclient.call('VideoLibrary.GetMovies',
        properties = [
            "director", "title", "genre",
            "dateadded", "playcount", "originaltitle",
            "thumbnail", "year", "imdbnumber",
            "lastplayed", "plot",
        ],
        sort = dict(order="descending", method="dateadded")
    )

    logger.debug("Retrieved list of movies")

    movies = response['movies']

    if not os.path.isdir(THUMBNAIL_CACHE):
        logger.info("Thumbnail cache dir doesn't exist. Creating it...")
        os.makedirs(THUMBNAIL_CACHE)

    logger.info("Found {} movies to process. Using up to {} processes".format(
        len(movies), processes
    ))

    pool = multiprocessing.Pool(processes)

    logger.info("Downloading metadata")
    pool.map(download_original_thumbnail, movies)

    logger.info("Resizing thumbnails")
    pool.map(resize_thumbnail, movies)

    logger.info("Generating json output")
    write_json_data(movies, output, pretty)

    logger.info("Done")


def download_original_thumbnail(movie):
    global jsonclient
    movie_id = movie['imdbnumber']

    logger.debug("Processing movie id {}".format(movie['movieid']))

    basepath = os.path.join(THUMBNAIL_CACHE, str(movie_id))

    existing = glob("{}.*".format(basepath))
    if len(existing) > 0:
        # file exists, nothing to do
        logger.debug("Thumb for {} already downloaded as {}".format(movie_id, existing[0]))
        return

    thumb_url = unquote(movie['thumbnail'][8:-1])
    request_args = {}

    result = jsonclient.call('Files.PrepareDownload', movie['thumbnail'])
    if result['mode'] == 'redirect':
        logger.debug("{}: Using VFS instead of direct download".format(movie_id))
        (_, vfs_path) = result['details']['path'].split("/", 1)

        if jsonclient.username is not None and jsonclient.password is not None:
            request_args['auth'] = (jsonclient.username, jsonclient.password)

        vfs_url = jsonclient.url.replace('jsonrpc', 'vfs')
        thumb_url = '{}/{}'.format(vfs_url, vfs_path)

    logger.debug("URL being used to download: {}".format(thumb_url))

    req = requests.get(thumb_url, stream=True, **request_args)

    # FIXME I'm assuming jpg is always the proper format
    extension = 'jpg'

    filename = "{}.{}".format(basepath, extension)
    with open(filename, 'wb') as fd:
        for chunk in req.iter_content(1000):
            fd.write(chunk)

    logger.debug("Successfully downloaded {}".format(filename))
    return


def write_json_data(movies, outputfile, pretty=False):
    output = []
    for movie in movies:
        jsondata = dict(
            id=movie['movieid'],
            title=movie['title'],
            year=movie['year'],
            imdbnumber=movie['imdbnumber'],
            genres=movie.get('genre', []),
            directors=movie.get('director', []),
            plot=movie['plot'],
            playcount=movie['playcount'],
            lastplayed=movie['lastplayed'],
        )
        output.append(jsondata)

    kwargs = {}
    if pretty:
        kwargs = dict(sort_keys=True, indent=2, separators=(',', ': '))

    with open(outputfile, 'wb') as fd:
        fd.write('var movies = ' + json.dumps(output, **kwargs) + ';')

def resize_thumbnail(movie):
    movie_id = movie['imdbnumber']

    original_thumbnail = os.path.join(THUMBNAIL_CACHE, "{}.jpg".format(movie_id))
    final_thumbnail = os.path.join(THUMBNAIL_DIR, "{}.jpg".format(movie_id))

    if os.path.exists(final_thumbnail):
        logger.debug("Resized thumbnail already exists for movie {}".format(movie_id))
    else:
        logger.info("Generating {}".format(final_thumbnail))
        os.system("convert {} -resize '200x300!' -strip {}".format(original_thumbnail, final_thumbnail))


if __name__ == '__main__':
    # FIXME I use jsonclient as a global here because partial() and
    # multiprocessing weren't playing nicelly on Python 2.x. On 3x
    # it should work since `partial` becomes pickle-able.
    jsonclient = None
    update_library()
