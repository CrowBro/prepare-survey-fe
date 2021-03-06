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

interface CategoryDetailsProps {
    categories: List<ProductCategory>;
    benchmarkCategories: ProductCategory[];
    sportId: number;
    onChange: (action: (categories: List<ProductCategory>) => List<ProductCategory>) => void;
}

const CategoryDetailsForm = ({ categories, benchmarkCategories, sportId, onChange }: CategoryDetailsProps) => {

    return (
        <Grid item lg={12}>
            <Paper>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"}>
                        <Toolbar>
                            <Typography variant={"h5"} color="primary">Product category details</Typography>
                        </Toolbar>
                    </Container>
                    <Divider />
                </Grid>
                {
                    categories.map((product: ProductCategory, index: number) => (
                        <Category
                            key={index}
                            product={product}
                            benchmarkProduct={benchmarkCategories[index]}
                            sportId={sportId}
                            onChange={(value) => onChange(s => s.set(index, value))}
                            addEnabled={categories.count() < 6}
                            onAdd={() => {}}
                            onRemove={() => onChange(s => s.remove(index))}
                        />
                    ))
                }
            </Paper>
        </Grid>
    )
}

export default CategoryDetailsForm;
