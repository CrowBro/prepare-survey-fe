import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import DetailsForm from "components/userDetails";
import SaveIcon from "@material-ui/icons/Save";
import { User, saveUser } from "dataAccess/api";
import { apiConfig } from "dataAccess/apiConfig";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldSpacing: {
            marginTop: theme.spacing(3),
        },
        titleGrid: {
            marginTop: 22,
            textAlign: "right",
            paddingRight: 20
        },
        secondTitle: {
            marginTop: 50
        },
        iconMargin: {
            marginLeft: 20
        }
    }),
);

interface UserProps {
    authHeader: string;
    currentCountry: string;
    user: User;
    onChange: (user: User) => void;
    onAdd: () => void;
}

const UserDetails = (props: UserProps) => {
    const { user, onChange } = props;
    const authHeader = props.authHeader;
    const currentCountry = props.currentCountry;
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...user, name: value });
    }

    const classes = useStyles();

    const handleSave = () => {
        if (user) {
            saveUser(authHeader, user, currentCountry)
                .then(resp => console.log(resp.email +" saved"));
        }
    }

    return (
        <>
        <TableCell> <TextField value={user.name} onChange={handleNameChange}/></TableCell>
        <TableCell> <TextField value={user.email} onChange={handleNameChange}/></TableCell>
        <TableCell> <TextField value={user.role} onChange={handleNameChange}/></TableCell>
        <TableCell> <Button variant={"contained"} size={"small"} color={"primary"} onClick={handleSave}>
                    <SaveIcon/> Save
            </Button></TableCell>
        </>
    )
}

export default UserDetails;
