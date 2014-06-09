# Bioscoop

Bioscoop is yet another tool to export your XBMC library to HTML. The
goal of this project is pleasing its author and indulging his desire
to learn a little bit more about this client-side stuff.

## What? Why another one?

So, I wanted an easy way to view my XBMC movie library while away from
home and that looked acceptably good on mobile so I would be able to
pick my next movie to watch on my way home.

What I did _not_ want was anything that required server-side code nor
to use any of the "social" services for sharing a XBMC library out
there due to privacy concerns.

I also needed an excuse to hack on anything client-side, which is not
something I have any degree of expertise on. While I started doing it
all in Python and using [Flask][1], [Frozen-Flask][2] and [requests][3],
I soon felt the need of having something to help me organize JS in a
sane way while not getting completely lost with all the new things I
was trying to absorb at once.

Here is the new (to me) stuff that I used:

 * [Bower][4]
 * [Backbone][5]
 * [Bootstrap][6]
 * [Underscore][7] (Too bad its name doesn't start with a "B")


## Installation

Clone the repository and cd to it:

    $ git clone http://github.com/caio/bioscoop

Install the external Javascript libraries:

    $ bower install

Then copy it all over to any server capable of serving static files.

### Updating Your Library

The library retrieval requires that you have a running XBMC instance
with the remote web UI properly enabled.

Once you get that done, you need to install the python dependencies:

    $ pip install -r requirements.txt

And then fire up the script which will connect via jsonrpc to your
XBMC server and retrieve all movie metadata (*NOTICE*: This will
overwrite the `data.js` file):

    $ ./download_and_prepare_library.py

There are a few options you can tweak when playing around with the
script, they might come in handy if you plan on running the library
update via a cronjob or something similar:

    $ ./download_and_prepare_library.py --help

    Usage: download_and_prepare_library.py [OPTIONS]

    Options:
    --host TEXT          XBMC server address
    --username TEXT      Username for logging in on XBMC
    --password TEXT      Password for logging in on XBMC
    --processes INTEGER  Number of processes to use during download/conversion
    --output TEXT        Name of the file to output the library as JSON
    --pretty             Prettify the JSON output
    --debug              Enable debugging messages
    --help               Show this message and exit.

## Acknowledgments

 * https://github.com/dmytroyarmak/backbone-contact-manager
 * http://movielist.wbbcoder.de/

[1]: http://flask.pocoo.org/
[2]: https://pythonhosted.org/Frozen-Flask/
[3]: http://python-requests.org
[4]: http://bower.io/
[5]: http://backbonejs.org/
[6]: http://getbootstrap.com/
[7]: http://underscorejs.org/
