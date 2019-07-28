#!/usr/bin/env bash
yarn
yarn build --progress
docker build -t survey-fe .
docker tag survey-fe benaaasaaas/prepare-survey
docker push benaaasaaas/prepare-survey
