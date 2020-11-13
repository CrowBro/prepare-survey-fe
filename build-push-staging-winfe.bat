yarn build
docker build -t prepare-survey-fe .
docker tag prepare-survey-fe nicolasgodon/prepare-survey-fe:staging
docker push nicolasgodon/prepare-survey-fe:staging