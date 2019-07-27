import * as React from "react";
import { Typography, Toolbar, Container, Grid, Paper } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { List } from "immutable";
import BorderedContainer from "components/borderedContainer";
import Competitor from "types/competitor";
import BrandsCompetitor from "components/brandsCompetitor";

const defaultsProducts: Competitor[] = [
    {
        id: 1,
        name: "Velo computer",
    },
    {
        id: 2,
        name: "Velo computer",
    }
]

interface CategoryDetailsProps {
    products: Competitor[];
}

const CategoryDetailsForm = (props: CategoryDetailsProps) => {
    const [products, setProducts] = React.useState(List<Partial<Competitor>>(props.products));

    return (
        <Paper>
            <Container maxWidth={"md"}>
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <BorderedContainer maxWidth={"md"}>
                            <Toolbar>
                                <Typography variant={"h5"}>Brand's Competitor Details</Typography>
                            </Toolbar>
                        </BorderedContainer>
                    </Grid>
                    <Grid container spacing={0}>
                        {
                            products.isEmpty()
                                ? <AddCircle color="primary" onClick={() => setProducts(s => s.push({}))} />
                                : <>
                                {
                                    products.map((product: Partial<Competitor>, index: number) => (
                                        <BrandsCompetitor
                                            product={product}
                                            addEnabled={products.count() < 4}
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