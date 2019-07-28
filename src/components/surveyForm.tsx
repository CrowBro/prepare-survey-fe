import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import { getSurvey, SurveyResponse } from "dataAccess/surveyApi";
import SurveyQuestionList from "components/surveyQuestionList";

const SurveyForm = () => {
    const [ surveys, setSurveys ] = useState<SurveyResponse | null>(null)

    useEffect(() => {
        getSurvey()
            .then(resp => setSurveys(resp));
    }, []);

    const currentSurvey = surveys && surveys.latestVersionSurvey && surveys.latestVersionSurvey.questions;
    const currentQuestions = currentSurvey || [];
    const benchmarkSurvey = surveys && surveys.benchmarkSurvey && surveys.benchmarkSurvey.questions;
    const benchmarkQuestions = benchmarkSurvey || [];

    return (
        <div style={{ padding: 20 }}>
            <Grid
                container
                direction={"row"}
                justify={"center"}
                alignItems={"flex-start"}
                spacing={3}
            >
                <SurveyQuestionList
                    questions={currentQuestions}
                    baseQuestions={benchmarkQuestions}
                />
            </Grid>
        </div>
    )
}

export default SurveyForm;
