sudo ls &&
yarn build &&
sudo docker build -t prepare-survey-fe . &&
sudo docker tag prepare-survey-fe crowbro/prepare-survey-fe &&
sudo docker push crowbro/prepare-survey-fe
