docker build -t prepare-survey-fe .
docker tag prepare-survey-fe nicolasgodon/prepare-survey-fe:hiddencountries
docker push nicolasgodon/prepare-survey-fe:hiddencountries