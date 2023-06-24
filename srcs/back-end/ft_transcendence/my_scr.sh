#!/bin/bash

while true; do
  echo "Starting 'npm run start'..."
  npm run start

  echo "Process 'npm run start' closed. Restarting..."
  sleep 1
done