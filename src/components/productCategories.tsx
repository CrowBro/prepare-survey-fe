import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { styled } from "@material-ui/styles";
import { List } from "immutable";
import Category from "components/productCategory";
import { ProductCategory } from "dataAccess/api";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

interface CategoryDetailsProps {
    categories: List<ProductCategory>;
    onChange: (action: (categories: List<ProductCategory>) => List<ProductCategory>) => void;
}

const CategoryDetailsForm = ({ categories, onChange }: CategoryDetailsProps) => {

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
                        categories.map((product: ProductCategory, index: number) => (
                            <Category
                                product={product}
                                onChange={(value) => onChange(s => s.set(index, value))}
                                addEnabled={categories.count() < 6}
                                onAdd={() => {}}
                                onRemove={() => onChange(s => s.remove(index))}
                            />
                        ))
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CategoryDetailsForm;
