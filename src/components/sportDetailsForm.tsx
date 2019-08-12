import * as React from "react";
import { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl";
import TextField  from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ReactSelect, { OptionType } from "components/autoComplete";
import { getBrands } from "dataAccess/brandsApi";
import { SportDetails } from "dataAccess/api";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldSpacing: {
            marginTop: theme.spacing(3),
        },
        secondaryHelperText: {
            marginTop: theme.spacing(1)
        },
        lastTextField: {
            marginBottom: theme.spacing(1)
        },
        marginTop: {
            marginTop: "55px"
        },
        titleGridForDropdown: {
            marginTop: 50,
            textAlign: "right",
            paddingRight: 20
        },
        titleGrid: {
            marginTop: 47,
            textAlign: "right",
            paddingRight: 20
        },
        statusTitle: {
            marginTop: 27,
            textAlign: "right",
            paddingRight: 20
        }
    }),
);

const statusOptions: OptionType<string>[] = [
    {
        label: "Pending",
        value: "Pending"
    },
    {
        label: "Approved",
        value: "Approved"
    },
    {
        label: "To Review",
        value: "To Review"
    }
]

type SetDetails = (details: SportDetails) => SportDetails

interface DetailsFormProps {
    details: SportDetails;
    benchmarkDetails: SportDetails;
    onChange: (action: SetDetails) => void;
}

interface ItemProps {
    label: string;
    element: JSX.Element;
}

const Item = (props: ItemProps) => {
    const classes = useStyles();

    const { label, element } = props;

    return (
        <Grid container>
            <Grid item xs={2} className={clsx(classes.titleGrid)}>
                <Typography>
                    {label}
                </Typography>
            </Grid>
            <Grid item lg={10}>
                {element}
            </Grid>
        </Grid>
    )
}

const DetailsForm = ({ details, benchmarkDetails, onChange }: DetailsFormProps) => {
    const [ brands, setBrands ] = useState<OptionType<number>[]>([]);
    useEffect(() => {
        getBrands()
            .then(resp => setBrands(resp.map(brand => ({ value: brand.id, label: brand.name }))));
    }, [])
    const onChangeSync = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        action: (value: string) => (details: SportDetails) => SportDetails
    ) => {
        const value = event.currentTarget.value;
        onChange(s => action(value)(s));
    }
    const classes = useStyles();

    const handleStatusChange = (event: React.ChangeEvent<{ name: string; value: "Approved" | "Pending" | "To Review" }>) => {
        const value = event.target.value;
        onChange(details => ({
            ...details,
            status: value
        }))
    }

    return (
        <Grid item lg={12}>
            <Paper>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"} className={classes.marginTop}>
                        <Toolbar>
                            <Typography variant={"h5"} color={"primary"}>Sport details</Typography>
                        </Toolbar>
                    </Container>
                    <Divider />
                </Grid>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"}>
                        <FormControl fullWidth>
                            <Grid container>
                                <Grid item xs={2} className={clsx(classes.titleGridForDropdown)}>
                                    <Typography>
                                        Passion Brand
                                    </Typography>
                                </Grid>
                                <Grid item lg={10}>
                                    <FormControl fullWidth className={classes.textFieldSpacing}>
                                        <FormHelperText id="weight-helper-text">{benchmarkDetails.passionBrand.name}</FormHelperText>
                                        <ReactSelect
                                            label={""}
                                            options={brands}
                                            value={({ label: details.passionBrand.name, value: details.passionBrand.id })}
                                            onChange={(value) => onChange(s => ({...s, passionBrand: {id: value.value, name: value.label}}))}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Item label={"Sport Adult"} element={
                                <FormControl fullWidth className={classes.textFieldSpacing}>
                                    <FormHelperText id="weight-helper-text">{benchmarkDetails.adultName}</FormHelperText>
                                    <TextField
                                        value={details.adultName}
                                        onChange={(event) => onChangeSync(event, val => s => ({ ...s, adultName: val }))}
                                    />
                                </FormControl>
                            } />
                            <Item label={"Sport Junior"} element={
                                <FormControl fullWidth className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                    <FormHelperText id="weight-helper-text">{benchmarkDetails.juniorName}</FormHelperText>
                                    <TextField 
                                        value={details.juniorName}
                                        onChange={(event) => onChangeSync(event, val => s => ({ ...s, juniorName: val }))}
                                    />
                                </FormControl>
                            } />
                        </FormControl>
                    </Container>
                    <Divider />
                </Grid>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"}>
                        <FormControl fullWidth>
                            <Item label={"Full name 1"} element={
                                <FormControl fullWidth className={classes.textFieldSpacing}>
                                    <FormHelperText id="weight-helper-text">{benchmarkDetails.fullName1}</FormHelperText>
                                    <TextField
                                        value={details.fullName1}
                                        onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName1: val }))}
                                    />
                                    <FormHelperText id="weight-helper-text">Exemple : pour pratiquer “la balade à vélo”</FormHelperText>
                                </FormControl>
                            } />
                            <Item label={"Full name 2"} element={
                                <FormControl fullWidth className={classes.textFieldSpacing}>
                                    <FormHelperText id="weight-helper-text">{benchmarkDetails.fullName1}</FormHelperText>
                                    <TextField
                                        value={details.fullName2}
                                        onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName2: val }))}
                                    />
                                    <FormHelperText id="weight-helper-text">Exemple : parlons de votre pratique “de la balade à vélo”</FormHelperText>
                                </FormControl>
                            } />
                            <Item label={"Short name"} element={
                                <FormControl fullWidth className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                    <FormHelperText id="weight-helper-text">{benchmarkDetails.shortName}</FormHelperText>
                                    <TextField
                                        value={details.shortName}
                                        onChange={(event) => onChangeSync(event, val => s => ({ ...s, shortName: val }))}
                                    />
                                </FormControl>
                            } />
                        </FormControl>
                    </Container>
                    <Divider />
                </Grid>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"}>
                        <Grid container>
                            <Grid item xs={2} className={clsx(classes.statusTitle)}>
                                <Typography>
                                    Status
                                </Typography>
                            </Grid>
                            <Grid item lg={10}>
                                <FormControl fullWidth className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                    <Select
                                        value={details.status}
                                        onChange={handleStatusChange}
                                    >
                                        { statusOptions.map(option => {
                                            return(
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Container>
                    <Divider />
                </Grid>
            </Paper>
        </Grid>
    );
}

export default DetailsForm;
