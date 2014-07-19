#!/bin/bash

set -x
set -e

./download_and_prepare_library.py --username caioromao --output ~/Dropbox/Public/movies/data.js

rsync -avRt \
    app \
    index.html \
    README.md \
    vendor/bootstrap/dist/css/bootstrap.min.css \
    vendor/bootstrap/dist/fonts \
    vendor/bootstrap/dist/js/bootstrap.min.js \
    vendor/jquery/dist/jquery.min.js \
    vendor/jquery.lazyload/jquery.lazyload.min.js \
    vendor/underscore/underscore.js \
    vendor/backbone/backbone.js \
    vendor/showdown/compressed/showdown.js \
    ~/Dropbox/Public/movies/

sed -ie 's/mailto:/mailto:caioromao@gmail.com/g' ~/Dropbox/Public/movies/index.html
