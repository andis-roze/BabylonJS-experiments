#!/bin/bash

yarn dist
git checkout gh-pages
cp ./dist/* ./
git add .
git commit --amend
git please
git checkout master
