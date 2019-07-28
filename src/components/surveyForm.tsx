import * as React from "react";
import { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import SurveyQuestionForm from "components/surveyQuestionForm";
import { getSurvey, SurveyResponse } from "dataAccess/surveyApi";

const SurveyForm = () => {
    const [ surveys, setSurveys ] = useState<SurveyResponse | null>(null)

    useEffect(() => {
        getSurvey()
            .then(resp => setSurveys(resp))
    })

    const currentSurvey = surveys && surveys.latestVersionSurvey && surveys.latestVersionSurvey.questions;
    const currentQuestions = currentSurvey || [];

    return (
        <div style={{ padding: 20 }}>
            <Grid
                container
                direction={"row"}
                justify={"center"}
                alignItems={"flex-start"}
                spacing={3}
            >
                <Grid container item xs={6} spacing={1} direction={"column"}>
                    { currentQuestions.map((question) => (
                        <SurveyQuestionForm 
                            question={({
                                id: question.id,
                                text: question.questionText,
                                category: question.answerCategory,
                                answers: question.answerVariants.map(answer => ({
                                    id: answer.id,
                                    text: answer.answerText
                                }))
                            })}
                        />
                    )) }
                    <SurveyQuestionForm />
                    <SurveyQuestionForm />
                </Grid>
                <Grid container item xs={6} spacing={1} direction={"column"}>
                    <SurveyQuestionForm />
                    <SurveyQuestionForm />
                </Grid>
            </Grid>
        </div>
    )
}

export default SurveyForm;
