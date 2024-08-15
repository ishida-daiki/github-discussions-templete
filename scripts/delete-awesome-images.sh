#!/bin/bash
# scripts/delete-awesome-images.sh

set -e

# awesome-images フォルダの存在確認
if [ -d "awesome-images" ]; then
  echo "Deleting contents of awesome-images directory..."
  rm -rf awesome-images/*
  echo "Contents deleted."
else
  echo "awesome-images directory does not exist."
fi