#!/bin/bash
# scripts/delete-images-content.sh

set -e

# images フォルダの存在確認
if [ -d "images" ]; then
  echo "Deleting contents of images directory..."
  cd images
  find . -type f ! -name 'README.md' -delete
  echo "Contents deleted, except README.md."
else
  echo "images directory does not exist."
fi