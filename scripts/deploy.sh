#!/bin/sh

echo $PWD
npm run build
cd ../re2048
git add .
git commit -m "update frontend"
git push heroku master
