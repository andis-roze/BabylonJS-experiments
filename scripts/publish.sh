#!/bin/bash

rm -rfv ./dist
yarn dist
git checkout gh-pages
cp -r ./dist/* ./
git add .
git commit --amend
git please
git checkout master
