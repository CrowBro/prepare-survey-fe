ls ;
yarn build ;
docker build -t prepare-survey-fe2 . ;
docker tag prepare-survey-fe2 crowbro/prepare-survey-fe2:staging ;
docker push crowbro/prepare-survey-fe2:staging
