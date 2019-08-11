import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import { ProductCategory } from "dataAccess/api";
import { apiConfig } from "dataAccess/apiConfig";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldSpacing: {
            marginTop: theme.spacing(3),
        },
        titleGrid: {
            marginTop: 22,
            textAlign: "right",
            paddingRight: 20
        },
        secondTitle: {
            marginTop: 50
        },
        iconMargin: {
            marginLeft: 20
        }
    }),
);

interface CategoryProps {
    product: ProductCategory;
    benchmarkProduct: ProductCategory;
    sportId: number;
    onChange: (category: ProductCategory) => void;
    addEnabled: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

const Category = (props: CategoryProps) => {
    const { product, benchmarkProduct, sportId, onChange } = props;

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...product, name: value });
    }

    const classes = useStyles();

    return (
        <Grid className={classes.textFieldSpacing} container key={product.id}>
            <Grid item lg={12}>
                <Container maxWidth={"lg"}>
                    <Grid container>
                        <Grid item lg={2} className={classes.titleGrid}>
                            <Typography>
                                Name
                            </Typography>
                            <Typography className={classes.secondTitle}>
                                Product Family
                            </Typography>
                        </Grid>
                        <Grid item lg={7}>
                            <FormControl fullWidth>
                                <FormHelperText id="weight-helper-text">{benchmarkProduct && benchmarkProduct.name}</FormHelperText>
                                <TextField
                                    value={product.name}
                                    onChange={handleNameChange}
                                />
                                <FormHelperText id="weight-helper-text">name of the product to survey. Example “Gants” [et non “Gants de ski”]</FormHelperText>

                            </FormControl>
                            <Typography className={classes.textFieldSpacing}>
                                {product.family && product.family.name}
                            </Typography>
                        </Grid>
                        <Grid item lg={3}>
                            <img
                                className={classes.iconMargin}
                                src={`${apiConfig.baseUrl}/api/sports/${sportId}/productCategories/${product.id}/icon`}
                                alt={""}
                                width="90"
                                height="90"
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid className={classes.textFieldSpacing} item md={12}>
                <Divider />
            </Grid>
        </Grid>
    )
}

export default Category;
