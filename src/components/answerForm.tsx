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
import { Answer } from "types/surveyQuestion";
import ConfirmableTextInput from "components/confirmableTextInput";

const useStyles = makeStyles({
    switchStyle: {
        padding: 4
    }
})

interface AnswerFormProps {
    answers: Answer[];
    editable: boolean;
}

interface AnswerListItemProps {
    answer: Answer;
    editable: boolean;
}

const AnswerListItem = (props: AnswerListItemProps) => {
    const classes = useStyles();

    const { answer, editable } = props;

    const [ isEnabled, setEnabled ] = useState(answer.isEnabled);

    const [ editing, setEditing ] = useState(false);

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
                            value={answer.text}
                            onConfirm={(text) => console.log(text)}
                            onCancel={() => setEditing(false)}
                        />
                    }
                />
                : (
                    <>
                        <ListItemText 
                            disableTypography 
                            primary={answer.text} 
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
                    checked={isEnabled}
                    onClick={() => setEnabled(s => {
                        if (editable) 
                            return !s;
                        return s;
                    })}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const AnswerForm = (props: AnswerFormProps) => {
    const { answers, editable } = props;


    return (
        <List>
            { answers.map(answer => <AnswerListItem key={answer.id} answer={answer} editable={editable} />) }
        </List>
    )
}

export default AnswerForm;
