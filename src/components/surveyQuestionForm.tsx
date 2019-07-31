import * as React from "react";
import clsx from "clsx";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { SurveyQuestion } from "types/surveyQuestion";
import ConfirmableTextInput from "components/confirmableTextInput";
import AnswerForm from "components/answerForm";

const useStyles = makeStyles((theme: Theme) => ({
    card: {
        width: "100vh"
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
    },
    invisible: {
        visibility: "hidden"
    }
}));

interface SurveyQuestionFormProps {
    question: SurveyQuestion;
    expanded: boolean;
    onExpand: () => void;
    editable: boolean;
}

const SurveyQuestionForm = ({ question, expanded, onExpand, editable }: SurveyQuestionFormProps) => {
    const classes = useStyles();

    const [ editing, setEditing ] = useState(false);

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
                            { editing || !editable
                                ? <IconButton />
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
                            [classes.expandOpen]: expanded,
                            [classes.invisible]: question.answers.length === 0
                        })}
                        edge="end"
                        onClick={onExpand}
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout={"auto"}>
                    <AnswerForm answers={question.answers} editable={editable}/>
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
