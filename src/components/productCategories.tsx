import * as React from "react";
import { Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { AddCircle } from "@material-ui/icons";
import { List } from "immutable";
import Category from "components/productCategory";
import { ProductCategory } from "dataAccess/api";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

interface CategoryDetailsProps {
    initialCategories: ProductCategory[];
}

const CategoryDetailsForm = (props: CategoryDetailsProps) => {
    const [products, setProducts] = React.useState(List<Partial<ProductCategory>>(props.initialCategories));

    return (
        <Grid item md={12}>
            <Paper>
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
                                products.map((product: Partial<ProductCategory>, index: number) => (
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
            </Paper>
        </Grid>
    )
}

export default CategoryDetailsForm;
