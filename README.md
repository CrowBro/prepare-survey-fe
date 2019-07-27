# Prepare survey FE

## Project setup

```bash
yarn
```

## Run local

This script will run UI on [http://localhost:10001](http://localhost:10001)
```bash
yarn start
```

## Build and push to docker
```bash
yarn build
docker build -t prepare-survey-fe .
docer tag prepare-survey-fe benaaasaaas/prepare-survey
docker push benaaasaaas/prepare-survey
```

## Deploy in remote
```bash
docker stop fe
docker rm fe
docker pull benaaasaaas/prepare-survey
docker run -d -p 5000:5000 --name fe benaaasaaas/prepare-survey
```
