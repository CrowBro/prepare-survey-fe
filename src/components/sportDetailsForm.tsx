import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField  from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IntegrationReactSelect, { OptionType } from "components/autoComplete";
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
        }
    }),
);

const brands: OptionType<number>[] = [
    "Triban",
    "Van Rysel"
].map((brand, index) => { return { label: brand, value: index } });

type SetDetails = (details: SportDetails) => SportDetails

interface DetailsFormProps {
    details: SportDetails;
    benchmarkDetails: SportDetails;
    onChange: (action: SetDetails) => void;
}

const DetailsForm = ({ details, benchmarkDetails, onChange }: DetailsFormProps) => {
    const onChangeSync = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        action: (value: string) => (details: SportDetails) => SportDetails
    ) => {
        const value = event.currentTarget.value;
        onChange(s => action(value)(s));
    }
    const classes = useStyles();

    return (
        <Grid item md={12}>
            <Paper>
                <Grid item md={12}>
                    <Container maxWidth={"md"}>
                        <Toolbar>
                            <Typography variant={"h5"} color={"primary"}>Sport details</Typography>
                        </Toolbar>
                    </Container>
                    <Divider />
                </Grid>
                <Grid item md={12}>
                    <Container maxWidth={"md"}>
                        <FormControl fullWidth>
                            <FormControl className={classes.textFieldSpacing}>
                                <IntegrationReactSelect
                                    label="Sport passion brand"
                                    options={brands}
                                    value={({ label: details.passionBrand.name, value: details.passionBrand.id })}
                                    onChange={(value) => onChange(s => ({...s, passionBrand: {id: value.value, name: value.label}}))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.passionBrand.name}`}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.textFieldSpacing}>
                                <TextField
                                    label={"Sport Adult"}
                                    value={details.adultName}
                                    onChange={(event) => onChangeSync(event, val => s => ({ ...s, adultName: val }))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.adultName}`}</FormHelperText>
                            </FormControl>
                            <FormControl className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                <TextField 
                                    label={"Sport Junior"} 
                                    value={details.juniorName}
                                    onChange={(event) => onChangeSync(event, val => s => ({ ...s, juniorName: val }))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.juniorName}`}</FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Container>
                    <Divider />
                </Grid>
                <Grid item md={12}>
                    <Container maxWidth={"md"}>
                        <FormControl fullWidth>
                            <FormControl className={classes.textFieldSpacing}>
                                <TextField
                                    label={"Full name 1"} 
                                    value={details.fullName1}
                                    onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName1: val }))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.fullName1}`}</FormHelperText>
                            </FormControl>
                            <FormControl className={classes.textFieldSpacing}>
                                <TextField
                                    label={"Full name 2"}
                                    value={details.fullName2}
                                    onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName2: val }))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.fullName2}`}</FormHelperText>
                            </FormControl>
                            <FormControl className={clsx(classes.textFieldSpacing, classes.lastTextField)}>
                                <TextField
                                    label={"Short name"} 
                                    value={details.shortName}
                                    onChange={(event) => onChangeSync(event, val => s => ({ ...s, shortName: val }))}
                                />
                                <FormHelperText id="weight-helper-text">{`French: ${benchmarkDetails.shortName}`}</FormHelperText>
                            </FormControl>
                        </FormControl>
                    </Container>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default DetailsForm;
