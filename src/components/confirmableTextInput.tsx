import * as React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Check from "@material-ui/icons/Check";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles({
    root: {
        padding: "2px 4px",
        marginRight: "20px",
        display: "flex"
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
    value: string;
    onConfirm: (text: string) => void;
    onCancel: () => void;
}

const ConfirmableTextInput = (props: QuestionTitleInput) => {
    const classes = useStyles();

    const { onConfirm, onCancel, value } = props;

    const [ text, setText ] = useState(value);

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

export default ConfirmableTextInput;
