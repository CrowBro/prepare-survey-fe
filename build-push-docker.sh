sudo ls &&
yarn build &&
sudo docker build -t prepare-survey-fe2 . &&
sudo docker tag prepare-survey-fe2 nicolasgodon/prepare-survey-fe2:latest &&
sudo docker push nicolasgodon/prepare-survey-fe2:latest
