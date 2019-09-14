import * as React from "react";
import clsx from "clsx";
import { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Edit from "@material-ui/icons/Edit";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Question } from "dataAccess/surveyApi";
import { QuestionChange, AnswersAction } from "types/survey";
import ConfirmableTextInput from "components/confirmableTextInput";
import AnswerForm from "components/answerForm";
import { QuestionWithPreview } from "./surveyQuestionList";

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
    },
    questionHeadermargin: {
        verticalAlign: "bottom",
    },
    questionPreview: {
        backgroundColor: "#F2F3F8",
        padding: 5,
    },
    cartContent: {
        paddingTop: 0,
        paddingBottom: 0,
    },

}));

interface SurveyQuestionFormProps {
    question: QuestionWithPreview;
    expanded: boolean;
    onExpand: () => void;
    editable: boolean;
    onChange: QuestionChange;
    enablePreview?: boolean;
}

const SurveyQuestionForm = ({ question, expanded, onExpand, editable, onChange, enablePreview }: SurveyQuestionFormProps) => {
    const classes = useStyles();

    const [editing, setEditing] = useState(false);
    const [editingNote, setEditingNote] = useState(false);

    const handleTitleChange = (text: string) => {
        onChange((question: Question) => ({
            ...question,
            questionText: text
        }));
        setEditing(false);
    }

    const handleNoteChange = (text: string) => {
        onChange((question: Question) => ({
            ...question,
            noteText: text
        }));
        setEditingNote(false);
    }

    const handleAnswersChange = (action: AnswersAction) => {
        onChange((question: Question) => ({
            ...question,
            answerVariants: action(question.answerVariants)
        }));
    }

    return (
        <Grid container>
            <Card className={classes.card}>
                <>
                    {question.noteText === "!TranslationNotFound:!"
                        ? <></>
                        : <CardHeader
                            titleTypographyProps={{ variant: "body1" }}
                            title={
                                <>
                                    {editingNote
                                        ? <ConfirmableTextInput
                                            value={question.noteText}
                                            onConfirm={handleNoteChange}
                                            onCancel={() => setEditingNote(false)}
                                            placeholder="Note text"
                                            smallFont={true}
                                        />
                                        : question.noteText
                                    }
                                </>
                            }
                            action={
                                <>
                                    {editingNote || !editable
                                        ? <IconButton />
                                        :
                                        <IconButton onClick={() => setEditingNote(s => !s)} >
                                            <Edit />
                                        </IconButton>
                                    }
                                </>
                            }
                        />
                    }
                </>
                <CardHeader
                    title={
                        <>
                            {editing
                                ? <ConfirmableTextInput
                                    value={question.questionText}
                                    onConfirm={handleTitleChange}
                                    onCancel={() => setEditing(false)}
                                    placeholder="Question text"
                                    smallFont={false}
                                />
                                : question.questionText
                            }
                        </>
                    }
                    action={
                        <>
                            {editing || !editable
                                ? <IconButton />
                                :
                                <IconButton onClick={() => setEditing(s => !s)} >
                                    <Edit />
                                </IconButton>
                            }
                        </>
                    }
                />
                {enablePreview && question.questionPreview && (
                    <CardContent className={classes.cartContent}>
                        <div className={classes.questionPreview}>
                            <Typography variant="h6" display="block">Preview:</Typography>
                            <Typography variant="body1" display="block">{question.questionPreview}</Typography>
                        </div>
                    </CardContent>
                )}
                <CardActions>
                    <Typography>
                        List {question.answerCategory}
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                            [classes.invisible]: question.answerVariants.length === 0
                        })}
                        edge="end"
                        onClick={onExpand}
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout={"auto"}>
                    <AnswerForm answers={question.answerVariants} editable={editable} onChange={handleAnswersChange} />
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
