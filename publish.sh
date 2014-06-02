#!/bin/bash

set -x
rsync -avRt \
    app \
    data.js \
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
