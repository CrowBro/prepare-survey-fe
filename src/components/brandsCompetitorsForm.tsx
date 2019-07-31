import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddCircle from "@material-ui/icons/AddCircle";
import { List } from "immutable";
import BorderedContainer from "components/borderedContainer";
import BrandsCompetitor from "components/brandsCompetitor";
import { BrandCompetitor } from "dataAccess/api";

interface CategoryDetailsProps {
    initialCompetitors: BrandCompetitor[];
}

const CategoryDetailsForm = (props: CategoryDetailsProps) => {
    const [products, setProducts] = React.useState(List<Partial<BrandCompetitor>>(props.initialCompetitors));

    return (
        <Grid item md={12}>
            <Paper>
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
                                products.map((product: Partial<BrandCompetitor>, index: number) => (
                                    <BrandsCompetitor
                                        product={product}
                                        addEnabled={products.count() < 4}
                                        onAdd={() => setProducts(s => s.insert(index + 1, {}))}
                                        onRemove={() => setProducts(s => s.remove(index))}
                                    />
                                ))
                            }
                        </>
                    }
                </Grid>
            </Paper>
        </Grid>
    )
}

export default CategoryDetailsForm;
