sudo ls &&
yarn build &&
sudo docker build -t prepare-survey-fe2 . &&
sudo docker tag prepare-survey-fe2 crowbro/prepare-survey-fe2 &&
sudo docker push crowbro/prepare-survey-fe2
