import * as React from "react";
import { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Switch from "@material-ui/core/Switch";
import Edit from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { Answer } from "dataAccess/surveyApi";
import ConfirmableTextInput from "components/confirmableTextInput";
import { AnswersChange, AnswerChange, AnswerAction } from "types/survey";

const useStyles = makeStyles({
    switchStyle: {
        padding: 4
    }
})

interface AnswerFormProps {
    answers: Answer[];
    onChange: AnswersChange;
    editable: boolean;
}

interface AnswerListItemProps {
    answer: Answer;
    onChange: AnswerChange;
    editable: boolean;
}

const AnswerListItem = (props: AnswerListItemProps) => {
    const classes = useStyles();

    const { answer, editable, onChange } = props;

    const [ editing, setEditing ] = useState(false);

    const handleTextChange = (text: string) => {
        onChange((answer: Answer) => ({
            ...answer,
            answerText: text
        }));
        setEditing(false);
    }

    const handleSwitch = () => {
        if(editable) {
            onChange(answer => ({
                ...answer,
                isEnabled: !answer.isEnabled
            }))
        }
    }

    return (
        <ListItem
            onClick={() => {
                if(!editing) setEditing(true && editable);
            }}
        >
            { editing
                ?
                <ListItemText
                    disableTypography
                    primary={
                        <ConfirmableTextInput
                            value={answer.answerText}
                            onConfirm={handleTextChange}
                            onCancel={() => setEditing(false)}
                            placeholder = "Answer text"
                            smallFont={false}
                        />
                    }
                />
                : (
                    <>
                        <ListItemText
                            disableTypography
                            primary={answer.answerText}
                        />
                        { editable
                            ?
                            <ListItemIcon>
                                <Edit />
                            </ListItemIcon>
                            : <></>
                        }
                    </>
                )
            }
            <ListItemSecondaryAction className={classes.switchStyle}>
                <Switch
                    color="primary"
                    edge="end"
                    checked={answer.isEnabled}
                    onClick={handleSwitch}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const AnswerForm = (props: AnswerFormProps) => {
    const { answers, editable, onChange } = props;

    const handleChange = (index: number, answer: AnswerAction) => {
        onChange(answers => {
            answers[index] = answer(answers[index]);
            return answers
        })
    }

    return (
        <List>
            { answers.map((answer, index) => <AnswerListItem key={answer.id} answer={answer} editable={editable} onChange={(answer) => handleChange(index, answer)}/>) }
        </List>
    )
}

export default AnswerForm;
