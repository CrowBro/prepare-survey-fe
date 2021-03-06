import * as React from "react";
import { useState, useEffect } from "react"
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
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
import { RadioGroup, FormControlLabel, Radio, Link } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexContainerStretch: {
            display: "flex",
            flexGrow: 1
        },
        linkStyle: {
            paddingLeft: "20px"
        },

        marginToppy: {
            marginTop: "6px",
        },

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
        label: "To Review",
        value: "To Review"
    },
    {
        label: "Pending",
        value: "Pending"
    },
    {
        label: "Approved",
        value: "Approved"
    },
    {
        label: "Disabled",
        value: "Disabled"
    },
]

const videoOptions: OptionType<string>[] = [
    {
        label: "Yes",
        value: "true"
    },
    {
        label: "No",
        value: "false"
    }
]

type SetDetails = (details: SportDetails) => SportDetails

interface DetailsFormProps {
    authHeader: string;
    currentCountry: string;
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

const DetailsForm = ({ authHeader, currentCountry, details, benchmarkDetails, onChange }: DetailsFormProps) => {
    const [brands, setBrands] = useState<OptionType<number>[]>([]);
    // console.log("TypeScript issues:", details.video === "false", details.video === false,details.video === "true", details.video === true, details.video);
    useEffect(() => {
        getBrands(authHeader, currentCountry)
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

    const handleStatusChange = (event: React.ChangeEvent<{ name: string; value: "To Review" | "Pending" | "Approved" | "Disabled" }>) => {
        const value = event.target.value;
        onChange(details => ({
            ...details,
            status: value
        }));
    }

    const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        onChange(details => ({
            ...details,
            video: value
        }));
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
                                        <FormHelperText id="weight-helper-text">{""}</FormHelperText>
                                        <ReactSelect
                                            defaultT={0}
                                            label={""}
                                            options={brands}
                                            value={({ label: details.passionBrand.name, value: details.passionBrand.id })}
                                            onChange={(value) => onChange(s => ({ ...s, passionBrand: { id: value.value, name: value.label } }))}
                                            // Workaround, but the issue lies in the ReactSelect component
                                            key={details.passionBrand.id}
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
                                        {statusOptions.map(option => {
                                            return (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* asdfas */}

                            <Grid item xs={2} className={clsx(classes.statusTitle)}>
                                <Typography className={classes.marginToppy}>
                                    Video NPS <br /> motion report
                                </Typography>
                            </Grid>
                            <Grid item lg={10}>
                                <div className={classes.flexContainerStretch}>
                                    <FormControl fullWidth className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                        <RadioGroup aria-label="video" name="video2" value={details.video + ""} onChange={handleVideoChange}>
                                            {/* {videoOptions.map(option => {
                                                return (
                                                    <FormControlLabel
                                                        key={option.value}
                                                        value={option.value}
                                                        control={<Radio color="primary" />}
                                                        label={option.label} />
                                                )
                                            })} */}
                                            <FormControlLabel
                                                key={videoOptions[0].value}
                                                value={videoOptions[0].value}
                                                control={<Radio color="primary" />}
                                                label={
                                                    <>
                                                        {videoOptions[0].label}
                                                        <Link
                                                            className={classes.linkStyle}
                                                            rel="noopener noreferer"
                                                            target="_blank"
                                                            href="https://drive.google.com/file/d/1xG2Ft7KkHvs_8LjvyN0KZ0mN2NQh1cTr/view?usp=drivesdk">
                                                            Watch an example from 2018
                                                        </Link>
                                                    </>
                                                } >
                                            </FormControlLabel>
                                            <FormControlLabel
                                                key={videoOptions[1].value}
                                                value={videoOptions[1].value}
                                                control={<Radio color="primary" />}
                                                label={videoOptions[1].label} />

                                        </RadioGroup>
                                    </FormControl>

                                </div>
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
