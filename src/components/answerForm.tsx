import * as React from "react";
import { useState } from "react";
import { List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction } from "@material-ui/core";
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
}

interface AnswerListItemProps {
    answer: Answer;
}

const AnswerListItem = (props: AnswerListItemProps) => {
    const classes = useStyles();

    const { answer } = props;
    const [ editing, setEditing ] = useState(false);

    return (
        <ListItem key={answer.id}>
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
                        <ListItemIcon
                            onClick={() => setEditing(true)}
                        >
                            <Edit />
                        </ListItemIcon>
                    </>
                )
            }
            <ListItemSecondaryAction className={classes.switchStyle}>
                <Switch
                    edge="end"
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const AnswerForm = (props: AnswerFormProps) => {
    const { answers } = props;


    return (
        <List>
            { answers.map(answer => <AnswerListItem answer={answer} />) }
        </List>
    )
}

export default AnswerForm;
