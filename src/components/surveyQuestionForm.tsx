import * as React from "react";
import { useState } from "react";
import { Card, CardActions, CardHeader, CardContent, Typography, Grid, IconButton, Paper, InputBase } from "@material-ui/core";
import { Edit, ExpandMore, Check, Close } from "@material-ui/icons";

interface Answer {
    id: number;
    text: string;
}

interface SurveyQuestion {
    id: number;
    text: string;
    answers: Answer[];
}

interface SurveyQuestionFormProps {
    question: SurveyQuestion;
    editing: boolean;
}

interface QuestionTextInputProps {
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

const QuestionTextInput = (props: QuestionTextInputProps) => {
    const { onConfirm, onCancel } = props;

    return (
        <Paper>
            <InputBase
                placeholder="Question text"/>
            <IconButton>
                <Check />
            </IconButton>
            <IconButton onClick={onCancel}>
                <Close />
            </IconButton>
        </Paper>
    )
}

const SurveyQuestionForm = ({ question }: SurveyQuestionFormProps) => {
    const [ editing, setEditing ] = useState(false);

    return (
        <Grid container>
            <Card>
                <CardHeader
                    title={
                        <>
                            {editing
                                ? <QuestionTextInput onConfirm={() => {  }} onCancel={() => setEditing(false)} />
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
                    <IconButton>
                        <ExpandMore />
                    </IconButton>
                </CardActions>
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
