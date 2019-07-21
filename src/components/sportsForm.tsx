import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
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

interface Product {
    id: number;
    name: string;
    category: string;
    iconUri: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Velo computer",
        category: "Accessories",
        iconUri: ""
    },
    {
        id: 2,
        name: "Velo computer",
        category: "Accessories",
        iconUri: ""
    }
]

const CategoryDetailsForm = () => (
    <Paper>
        <Container maxWidth={"md"}>
            <Grid container spacing={0}>
                <Grid item md={12}>
                    <BorderedContainer maxWidth={"md"}>
                        <Toolbar>
                            <Typography variant={"h5"}>Product category details</Typography>
                        </Toolbar>
                    </BorderedContainer>
                </Grid>
                <Grid container md={12}>
                    {products.map(product => (
                        <>
                            <Grid item md={9}>
                                <BorderedContainer maxWidth={"md"} id={product.id.toString()}>
                                    <FormControl fullWidth>
                                        <SpacedTextField label={"Name"} defaultValue={product.name}/>
                                        <SpacedTextField label={"Product family"} defaultValue={product.category}/>
                                    </FormControl>
                                </BorderedContainer>
                            </Grid>
                            <Grid item md={3}>
                                <AddCircle color="primary" />
                                <RemoveCircle color="error" />
                            </Grid>
                        </>
                    ))}
                </Grid>
            </Grid>
        </Container>
    </Paper>
)

// TODO: parametrize
const SportsForm = () => (
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

export default SportsForm;
