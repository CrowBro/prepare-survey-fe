sudo ls &&
yarn build &&
sudo docker build -t prepare-survey-fe . &&
sudo docker tag prepare-survey-fe benaaasaaas/prepare-survey &&
sudo docker push benaaasaaas/prepare-survey
