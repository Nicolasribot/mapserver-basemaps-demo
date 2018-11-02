#!/usr/bin/env bash

# how to install mapcache, os x:

ogdi:
make XCFLAGS="-arch i386 -arch x86_64 " \
    XLDFLAGS="-arch i386 -arch x86_64"
sudo -E make install