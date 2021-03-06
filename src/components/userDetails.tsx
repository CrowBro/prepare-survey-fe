import * as React from "react";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { User, saveUser, deleteUser } from "dataAccess/api";
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
}

const UserDetails = React.memo((props: UserProps) => {
    const { user, onChange } = props;
    const authHeader = props.authHeader;
    const currentCountry = props.currentCountry;

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...user, name: value });
    }
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...user, email: value });
    }
    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...user, role: value });
    }
    const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...user, countryCode: value });
    }

    const classes = useStyles();

    const handleSave = () => {
        if (user) {
            saveUser(authHeader, user, currentCountry)
                .then(res => window.location.reload(false));
        }
    }

    const handleDelete = () => {
        if (user) {
            deleteUser(authHeader, user, currentCountry)
                .then(() => window.location.reload(false));
        }
    }

    return (
        <>
        <TableCell> {user.userId} </TableCell>
        <TableCell> <TextField value={user.name} onChange={handleNameChange}/></TableCell>
        <TableCell> <TextField value={user.email} onChange={handleEmailChange}/></TableCell>
        <TableCell> <TextField value={user.role} onChange={handleRoleChange}/></TableCell>
        <TableCell> <TextField value={user.countryCode} onChange={handleCountryCodeChange}/></TableCell>
        <TableCell> <Button variant={"contained"} size={"small"} color={"primary"} onClick={handleSave}><SaveIcon/> Save</Button></TableCell>
        <TableCell> <Button variant={"contained"} size={"small"} color={"secondary"} onClick={handleDelete}><SaveIcon/> Delete</Button></TableCell>
        </>

             
    )
})

export default UserDetails;
