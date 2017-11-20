#!/bin/sh

echo $PWD
npm run build
cd ../re2048-heroku
git add .
git commit -m "update frontend"
git push heroku master
