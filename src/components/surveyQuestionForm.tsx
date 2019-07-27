import * as React from "react";
import { useState } from "react";
import { Card, CardActions, CardHeader, Grid, IconButton, Collapse } from "@material-ui/core";
import { Edit, ExpandMore } from "@material-ui/icons";
import { SurveyQuestion } from "types/surveyQuestion";
import QuestionTitleInput from "components/confirmableTextInput";

interface SurveyQuestionFormProps {
    question: SurveyQuestion;
    editing: boolean;
}

const SurveyQuestionForm = ({ question }: SurveyQuestionFormProps) => {
    const [ editing, setEditing ] = useState(false);
    const [ answerExpanded, setAnswersExpanded ] = useState(false);

    return (
        <Grid container>
            <Card>
                <CardHeader
                    title={
                        <>
                            {editing
                                ? <QuestionTitleInput question={question} onConfirm={(text) => { console.log(text) }} onCancel={() => setEditing(false)} />
                                : question.text
                            }
                        </>
                    }
                    action={
                        <>
                            {editing
                                ? <></>
                                :
                                <IconButton onClick={() => setEditing(s => !s)} >
                                    <Edit />
                                </IconButton>
                            }
                        </>
                    }
                />
                <CardActions>
                    <IconButton onClick={() => setAnswersExpanded(s => !s)}>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={answerExpanded} timeout={"auto"}>
                    <div> Test </div>
                </Collapse>
            </Card>
        </Grid>
    )
}

SurveyQuestionForm.defaultProps = {
    question: {
        id: 1,
        text: "What is your position?",
        answers: [
            {
                id: 1,
                text: "Manager"
            },
            {
                id: 2,
                text: "Cashier"
            }
        ]
    }
}

export default SurveyQuestionForm
