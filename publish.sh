#!/bin/bash

set -x
rsync -avt app data.js index.html vendor  ~/Dropbox/Public/movies/
