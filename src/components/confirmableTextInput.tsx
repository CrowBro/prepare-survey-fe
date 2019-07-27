import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { IconButton, Paper, InputBase } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { SurveyQuestion } from "types/surveyQuestion";

const useStyles = makeStyles({
    root: {
        padding: "2px 4px",
        display: "flex",
        alignItems: "center",
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        padding: 10,
    }
});

interface QuestionTitleInput {
    question: SurveyQuestion;
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

const QuestionTitleInput = (props: QuestionTitleInput) => {
    const classes = useStyles();

    const { onConfirm, onCancel, question } = props;

    const [ text, setText ] = useState(question.text);

    return (
        <Paper className={classes.root}>
            <InputBase
                className={classes.input}
                value={text}
                onChange={(evt) => setText(evt.target.value)}
                placeholder="Question text"/>
            <IconButton className={classes.iconButton} onClick={() => onConfirm(text)}>
                <Check />
            </IconButton>
            <IconButton className={classes.iconButton} onClick={onCancel}>
                <Close />
            </IconButton>
        </Paper>
    )
}

export default QuestionTitleInput;
