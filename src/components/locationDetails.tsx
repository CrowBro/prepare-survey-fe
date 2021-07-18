import * as React from "react";
import TextField from "@material-ui/core/TextField";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { Location, saveLocation} from "dataAccess/api";
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

interface LocationProps {
    authHeader: string;
    currentCountry: string;
    location: Location;
    onChange: (location: Location) => void;
}

const LocationDetails = React.memo((props: LocationProps) => {
    const { location, onChange } = props;
    const authHeader = props.authHeader;
    const currentCountry = props.currentCountry;

    const handleSourceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...location, name: value });
    }
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...location, name: value });
    }
    const handleRegionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...location, name: value });
    }
    const handleCountryCodeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...location, countryCode: value });
    }
    const handleVisibilityChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...location, name: value });
    }

    const classes = useStyles();

    const handleSave = () => {
        if (location) {
            saveLocation(authHeader, location, currentCountry)
                .then(res => window.location.reload(false));
        }
    }

    return (
        <>
        <TableCell> {location.locationId} </TableCell>
        <TableCell> <TextField value={location.source} onChange={handleSourceChange}/></TableCell>
        <TableCell> <TextField value={location.name} onChange={handleNameChange}/></TableCell>
        <TableCell> <TextField value={location.region} onChange={handleRegionChange}/></TableCell>
        <TableCell> <TextField value={location.countryCode} onChange={handleCountryCodeChange}/></TableCell>
        <TableCell> <TextField value={location.isHidden} onChange={handleVisibilityChange}/></TableCell>
        <TableCell> <Button variant={"contained"} size={"small"} color={"primary"} onClick={handleSave}><SaveIcon/> Save</Button></TableCell>
        </>            
    )
})

export default LocationDetails;
