#!/usr/bin/env bash

export NODE_PATH=$(npm root -g)

if [ "${BRANCH_TO}" != "dev" ]; then
  THUB_ENV="-e ${BRANCH_TO}"
fi

THUB_APPLY=""
if [ "${THUB_STATE}" == "approved" ]; then
  THUB_APPLY="-a"
fi

git checkout ${BRANCH_FROM}

terrahub run -y ${THUB_ENV} ${THUB_APPLY}
