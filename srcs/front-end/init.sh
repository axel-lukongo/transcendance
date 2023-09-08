#!/bin/bash
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt-get install -y nodejs
npm i 
echo "====> THE SITE IS READY! <===="
npm run start