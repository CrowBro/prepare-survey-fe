import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { ProductCategory } from "dataAccess/api";
import { apiConfig } from "dataAccess/apiConfig";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldSpacing: {
            marginTop: theme.spacing(3),
        },
    }),
);

interface CategoryProps {
    product: ProductCategory;
    sportId: number;
    onChange: (category: ProductCategory) => void;
    addEnabled: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

const Category = (props: CategoryProps) => {
    const { product, sportId, onChange } = props;

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = event.currentTarget.value;
        onChange({ ...product, name: value });
    }

    const classes = useStyles();

    return (
        <Grid className={classes.textFieldSpacing} container spacing={0} key={product.id}>
            <Grid item md={9}>
                <Container maxWidth={"md"}>
                    <FormControl fullWidth>
                        <TextField label={"Name"} value={product.name} onChange={handleNameChange}/>
                        <Typography className={classes.textFieldSpacing}>
                            {product.family && product.family.name}
                        </Typography>
                    </FormControl>
                </Container>
            </Grid>
            <Grid item md={3}>
                <img src={`${apiConfig.baseUrl}/api/sports/${sportId}/productCategories/${product.id}/icon`} alt={""}/>
            </Grid>
            <Grid className={classes.textFieldSpacing} item md={12}>
                <Divider />
            </Grid>
        </Grid>
    )
}

export default Category;
