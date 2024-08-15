#!/bin/bash
# scripts/delete-images-content.sh

set -e

# images フォルダの存在確認
if [ -d "images" ]; then
  echo "Deleting contents of images directory..."
  cd images
  rm -rf *
  echo "Contents deleted."
else
  echo "images directory does not exist."
fi