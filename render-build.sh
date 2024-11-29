#!/usr/bin/env bash
apt-get update
apt-get install -y libnss3 libatk1.0 libatk-bridge2.0 libgtk-3-0 libcups2
npm install
npm run build
