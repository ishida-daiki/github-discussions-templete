#!/bin/bash
# scripts/delete-images.sh

set -e

# images フォルダの存在確認
if [ -d "images" ]; then
  echo "Deleting contents of images directory..."
  rm -rf images/*
  echo "Contents deleted."
else
  echo "images directory does not exist."
fi