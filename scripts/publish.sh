#!/bin/bash

yarn dist
git checkout gh-pages
cp -r ./dist/* ./
git add .
git commit --amend
git please
git checkout master
