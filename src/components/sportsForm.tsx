import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import CategoryDetailsForm from "components/productCategories";
import ReactSelect, { OptionType } from "components/autoComplete";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

const brands: OptionType[] = [
    "Adidas",
    "Nike"
].map(brand => { return { label: brand, value: brand } });

// TODO: parametrize
const SportsForm = () => {
    return (
    <>
        <Paper>
            <Container maxWidth={"md"}>
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <BorderedContainer maxWidth={"md"}>
                            <Toolbar>
                                <Typography variant={"h5"}>Sport details</Typography>
                            </Toolbar>
                        </BorderedContainer>
                    </Grid>
                    <Grid item md={9}>
                        <BorderedContainer maxWidth={"md"}>
                            <FormControl fullWidth>
                                <ReactSelect label="Sport passion brand" options={brands}/>
                                <SpacedTextField label={"Sport Adult"} />
                                <SpacedTextField label={"Sport Junior"} />
                            </FormControl>
                        </BorderedContainer>
                        <BorderedContainer maxWidth={"md"}>
                            <FormControl fullWidth>
                                <SpacedTextField label={"Full name 1"} />
                                <SpacedTextField label={"Full name 2"} />
                                <SpacedTextField label={"Short name"} />
                            </FormControl>
                        </BorderedContainer>
                    </Grid>
                    <Grid item md={3}>
                        <span>Test</span>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
        <CategoryDetailsForm />
    </>
    );
}

export default SportsForm;
