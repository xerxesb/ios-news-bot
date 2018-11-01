#!/bin/bash

apt-get update
apt-get --assume-yes install build-essential curl python
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
. ~/.bashrc
nvm install 8
npm install
npm install claudia -g
echo "Setup complete. Remember to put your AWS credentials in ~/.aws/credentials!"