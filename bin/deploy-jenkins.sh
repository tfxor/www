#!/usr/bin/env bash

set +x
export NVM_DIR="/mnt/data/jenkins/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" > /dev/null

nvm install 6.10.3
nvm use 6.10.3

export NODE_PATH=$(npm root -g)
BRANCH_FROM="dev"
BRANCH_TO="dev"
if [ "${BRANCH_TO}" != "dev" ]; then
  THUB_ENV="-e ${BRANCH_TO}"
fi

echo '~~~~~'
git branch
git checkout ${BRANCH_TO}
git checkout ${BRANCH_FROM}

terrahub run -a -y ${THUB_ENV}
