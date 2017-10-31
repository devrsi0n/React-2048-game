#!/bin/sh

yarn build;
cd ../re2048;
git commit -am \"update frontend\";
git push heroku master;
