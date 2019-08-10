import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import TextField  from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/styles";
import IntegrationReactSelect, { OptionType } from "components/autoComplete";
import { SportDetailsCouple } from "dataAccess/api";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

const brands: OptionType<number>[] = [
    "Triban",
    "Van Rysel"
].map((brand, index) => { return { label: brand, value: index } });

type SetDetailsCouple = (details: SportDetailsCouple) => SportDetailsCouple

interface DetailsFormProps {
    details: SportDetailsCouple;
    onChange: (action: SetDetailsCouple) => void;
}

const DetailsForm = ({ details, onChange }: DetailsFormProps) => {
    const onChangeSync = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
        action: (value: string) => (details: SportDetailsCouple) => SportDetailsCouple
    ) => {
        const value = event.currentTarget.value;
        onChange(s => action(value)(s));
    }
    return (
        <Grid item md={12}>
            <Paper>
                <Grid item md={12}>
                    <BorderedContainer maxWidth={"md"}>
                        <Toolbar>
                            <Typography variant={"h5"}>Sport details</Typography>
                        </Toolbar>
                    </BorderedContainer>
                </Grid>
                <Grid item md={12}>
                    <BorderedContainer maxWidth={"md"}>
                        <FormControl fullWidth>
                            <IntegrationReactSelect
                                label="Sport passion brand"
                                options={brands}
                                value={({ label: details.TargetSport.passionBrand.name, value: details.TargetSport.passionBrand.id })}
                                onChange={(value) => onChange(s => ({...s, passionBrand: {id: value.value, name: value.label}}))}
                            />
                            <SpacedTextField 
                                label={"Sport Adult"}
                                value={details.TargetSport.adultName}
                                onChange={(event) => onChangeSync(event, val => s => ({ ...s, adultName: val }))}
                            />
                            <SpacedTextField 
                                label={"Sport Junior"} 
                                value={details.TargetSport.juniorName}
                                onChange={(event) => onChangeSync(event, val => s => ({ ...s, juniorName: val }))}
                            />
                        </FormControl>
                    </BorderedContainer>
                </Grid>
                <Grid item md={12}>
                    <BorderedContainer maxWidth={"md"}>
                        <FormControl fullWidth>
                            <SpacedTextField 
                                label={"Full name 1"} 
                                value={details.TargetSport.fullName1}
                                onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName1: val }))}
                            />
                            <SpacedTextField 
                                label={"Full name 2"} 
                                value={details.TargetSport.fullName2}
                                onChange={(event) => onChangeSync(event, val => s => ({ ...s, fullName2: val }))}
                            />
                            <SpacedTextField 
                                label={"Short name"} 
                                value={details.TargetSport.shortName}
                                onChange={(event) => onChangeSync(event, val => s => ({ ...s, shortName: val }))}
                            />
                        </FormControl>
                    </BorderedContainer>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default DetailsForm;
