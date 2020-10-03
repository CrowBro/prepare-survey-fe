yarn build
docker build -t prepare-survey-fe2 .
docker tag prepare-survey-fe2 nicolasgodon/prepare-survey-fe2:staging
docker push nicolasgodon/prepare-survey-fe2:staging