import * as React from "react";
import { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { withRouter, RouteComponentProps } from "react-router-dom";
import CategoryDetailsForm from "components/productCategories";
import ReactSelect, { OptionType } from "components/autoComplete";
import BrandsCompetitorsForm from "components/brandsCompetitorsForm";
import { SportDetails, getSportDetails } from "dataAccess/api";

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

interface DetailsFormProps {
    initialDetails: SportDetails;
}

const DetailsForm = ({ initialDetails }: DetailsFormProps) => {
    const [ details, setDetails ] = useState(initialDetails);

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
                            <ReactSelect label="Sport passion brand" options={brands} value={({ label: details.passionBrand.name, value: details.passionBrand.id })}/>
                            <SpacedTextField 
                                label={"Sport Adult"}
                                value={details.adultName}
                                onChange={(event) => setDetails(s => ({ ...s, adultName: event.currentTarget.value }))}
                            />
                            <SpacedTextField 
                                label={"Sport Junior"} 
                                value={details.juniorName}
                                onChange={(event) => setDetails(s => ({ ...s, juniorName: event.currentTarget.value }))}
                            />
                        </FormControl>
                    </BorderedContainer>
                </Grid>
                <Grid item md={12}>
                    <BorderedContainer maxWidth={"md"}>
                        <FormControl fullWidth>
                            <SpacedTextField 
                                label={"Full name 1"} 
                                value={details.fullName1}
                                onChange={(event) => setDetails(s => ({ ...s, fullName1: event.currentTarget.value }))}
                            />
                            <SpacedTextField 
                                label={"Full name 2"} 
                                value={details.fullName2}
                                onChange={(event) => setDetails(s => ({ ...s, fullName2: event.currentTarget.value }))}
                            />
                            <SpacedTextField 
                                label={"Short name"} 
                                value={details.shortName}
                                onChange={(event) => setDetails(s => ({ ...s, shortName: event.currentTarget.value }))}
                            />
                        </FormControl>
                    </BorderedContainer>
                </Grid>
            </Paper>
        </Grid>
    );
}

// TODO: parametrize
const SportsForm = (props: RouteComponentProps<{id: string}>) => {
    const id = Number(props.match.params.id);
    const [ details, setDetails ] = useState<SportDetails | null>(null);

    useEffect(() => {
        getSportDetails(id)
            .then(resp => setDetails(resp));
    }, [ id ])

    return (
        <Container maxWidth={"md"}>
            <Grid
                justify="center"
                direction="row"
                container
                spacing={2}
            >
                { details
                    ? <DetailsForm initialDetails={details}/>
                    : <div> Loading... </div>
                }
                <CategoryDetailsForm />
                <BrandsCompetitorsForm />
            </Grid>
        </Container>
    );
}

export default withRouter(SportsForm);
