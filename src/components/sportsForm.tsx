import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import CategoryDetailsForm from "components/productCategories";
import ReactSelect, { OptionType } from "components/autoComplete";
import BrandsCompetitorsForm from "components/brandsCompetitorsForm";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

const brands: OptionType<string>[] = [
    "Adidas",
    "Nike"
].map(brand => { return { label: brand, value: brand } });

// TODO: parametrize
const SportsForm = () => {
    return (
        <Container maxWidth={"md"}>
            <Grid
                justify="center"
                direction="row"
                container
                spacing={2}
            >
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
                    </Paper>
                </Grid>
                <CategoryDetailsForm />
                <BrandsCompetitorsForm />
            </Grid>
        </Container>
    );
}

export default SportsForm;
