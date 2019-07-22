import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { List } from "immutable";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

interface Product {
    id: number;
    name: string;
    category: string;
    iconUri: string;
}

const defaultsProducts: Product[] = [
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

interface CategoryDetailsProps {
    products: Product[];
}

interface CategoryProps {
    product: Partial<Product>;
    addEnabled: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

const Category = (props: CategoryProps) => {
    const { product, addEnabled, onAdd, onRemove } = props;

    return (
        <Grid container spacing={0} key={product.id}>
            <Grid item md={9}>
                <BorderedContainer maxWidth={"md"}>
                    <FormControl fullWidth>
                        <SpacedTextField label={"Name"} defaultValue={product.name}/>
                        <SpacedTextField label={"Product family"} defaultValue={product.category}/>
                    </FormControl>
                </BorderedContainer>
            </Grid>
            <Grid item md={3}>
                {
                    addEnabled
                        ? <AddCircle color="primary" onClick={onAdd}/>
                        : <AddCircle color="disabled" />
                }
                <RemoveCircle color="error" onClick={onRemove}/>
            </Grid>
        </Grid>
    )
}

const CategoryDetailsForm = (props: CategoryDetailsProps) => {
    const [products, setProducts] = React.useState(List<Partial<Product>>(props.products));

    return (
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
                    <Grid container spacing={0}>
                        {
                            products.isEmpty()
                                ? <AddCircle color="primary" onClick={() => setProducts(s => s.push({}))} />
                                : <>
                                {
                                    products.map((product: Partial<Product>, index: number) => (
                                        <Category
                                            product={product}
                                            addEnabled={products.count() < 6}
                                            onAdd={() => setProducts(s => s.insert(index + 1, {}))}
                                            onRemove={() => setProducts(s => s.remove(index))}
                                        />
                                    ))}
                                </>
                        }
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    )
}

CategoryDetailsForm.defaultProps = {
    products: defaultsProducts
}

export default CategoryDetailsForm;
