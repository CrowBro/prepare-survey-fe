import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Container, Grid } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import Product from "types/product";

const BorderedContainer = styled(Container)({
    borderBottom: "1px solid black",
    marginBottom: 25
});

const SpacedTextField = styled(TextField)({
    marginBottom: 25
})

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

export default Category;
