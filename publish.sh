#!/bin/bash

set -x
rsync -avRt \
    app \
    data.js \
    index.html \
    vendor/bootstrap/dist/css/bootstrap.min.css \
    vendor/bootstrap/dist/fonts \
    vendor/bootstrap/dist/js/bootstrap.min.js \
    vendor/jquery/dist/jquery.min.js \
    vendor/jquery.lazyload/jquery.lazyload.min.js \
    vendor/underscore/underscore.js \
    vendor/backbone/backbone.js \
    ~/Dropbox/Public/movies/
