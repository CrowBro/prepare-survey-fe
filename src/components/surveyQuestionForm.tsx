import * as React from "react";
import clsx from "clsx";
import { useState } from "react";
import { Card, CardActions, CardHeader, Grid, IconButton, Collapse, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Edit, ExpandMore } from "@material-ui/icons";
import { SurveyQuestion } from "types/surveyQuestion";
import ConfirmableTextInput from "components/confirmableTextInput";
import AnswerForm from "components/answerForm";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        maxWidth: 450,
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    }
}));

interface SurveyQuestionFormProps {
    question: SurveyQuestion;
    editing: boolean;
}

const SurveyQuestionForm = ({ question }: SurveyQuestionFormProps) => {
    const classes = useStyles();

    const [ editing, setEditing ] = useState(false);
    const [ answerExpanded, setAnswersExpanded ] = useState(false);

    return (
        <Grid container>
            <Card className={classes.card}>
                <CardHeader
                    title={
                        <>
                            { editing
                                ? <ConfirmableTextInput
                                    value={question.text}
                                    onConfirm={(text) => { console.log(text) }}
                                    onCancel={() => setEditing(false)}
                                />
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
                    <Typography>
                        List {question.category}
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: answerExpanded,
                        })}
                        edge="end"
                        onClick={() => setAnswersExpanded(s => !s)}
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={answerExpanded} timeout={"auto"}>
                    <AnswerForm answers={question.answers}/>
                </Collapse>
            </Card>
        </Grid>
    )
}

SurveyQuestionForm.defaultProps = {
    question: {
        id: 1,
        text: "What is your position?",
        category: "Warehouses",
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
