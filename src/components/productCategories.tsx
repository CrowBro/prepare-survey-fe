import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { List } from "immutable";
import Category from "components/productCategory";
import { ProductCategory } from "dataAccess/api";
import * as uuid from "uuid";

interface CategoryDetailsProps {
    categories: List<ProductCategory>;
    sportId: number;
    onChange: (action: (categories: List<ProductCategory>) => List<ProductCategory>) => void;
}

const CategoryDetailsForm = ({ categories, sportId, onChange }: CategoryDetailsProps) => {

    return (
        <Grid item md={12}>
            <Paper>
                <Grid item md={12}>
                    <Container maxWidth={"md"}>
                        <Toolbar>
                            <Typography variant={"h5"}>Product category details</Typography>
                        </Toolbar>
                    </Container>
                    <Divider />
                </Grid>
                <Grid container spacing={0}>
                    {
                        categories.map((product: ProductCategory, index: number) => (
                            <Category
                                key={uuid()}
                                product={product}
                                sportId={sportId}
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
