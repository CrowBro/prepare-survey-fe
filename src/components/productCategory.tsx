import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/styles";
import { ProductCategory } from "dataAccess/api";
import { apiConfig } from "dataAccess/apiConfig";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

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

    return (
        <Grid container spacing={0} key={product.id}>
            <Grid item md={9}>
                <BorderedContainer maxWidth={"md"}>
                    <FormControl fullWidth>
                        <SpacedTextField label={"Name"} value={product.name} onChange={handleNameChange}/>
                        <Typography>
                            {product.family && product.family.name}
                        </Typography>
                    </FormControl>
                </BorderedContainer>
            </Grid>
            <Grid item md={3}>
                <img src={`${apiConfig.baseUrl}/api/sports/${sportId}/productCategories/${product.id}/icon`} alt={""}/>
            </Grid>
        </Grid>
    )
}

export default Category;
