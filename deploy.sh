#!/usr/bin/env bash
# 1. build
sh ./build.sh
## 2. deploy front-end
gsutil rsync -r -d public/ gs://cogitovirus.com