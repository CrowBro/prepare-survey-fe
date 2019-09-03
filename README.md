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
yarn build &&
sudo docker build -t prepare-survey-fe . &&
sudo docker tag prepare-survey-fe benaaasaaas/prepare-survey &&
sudo docker push benaaasaaas/prepare-survey
```

## dont use this. Use docker-compose which is in BE project dir.
## Deploy in remote
```bash
sudo docker stop fe &&
sudo docker rm fe &&
sudo docker pull benaaasaaas/prepare-survey &&
sudo docker run -d -p 5000:5000 --name fe benaaasaaas/prepare-survey
```
