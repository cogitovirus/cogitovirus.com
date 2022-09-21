#!/usr/bin/env bash
# build from scratch, just in case
./build.sh
# deploy with firebase
firebase deploy --only hosting