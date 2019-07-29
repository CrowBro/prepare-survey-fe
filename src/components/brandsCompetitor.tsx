import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import ReactSelect, { OptionType } from "components/autoComplete";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import Product from "types/product";
import BorderedContainer from "components/borderedContainer";

interface CategoryProps {
    product: Partial<Product>;
    addEnabled: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

const options: OptionType<number>[] = [
    {
        value: 1,
        label: "Nike",
    },
    {
        value: 2,
        label: "Adidas",
    }
]

const Competitor = (props: CategoryProps) => {
    const { product, addEnabled, onAdd, onRemove } = props;

    return (
        <Grid container spacing={0} key={product.id}>
            <Grid item md={9}>
                <BorderedContainer maxWidth={"md"}>
                    <FormControl fullWidth>
                        <ReactSelect label={"Name"} options={options}/>
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

// TODO: remove
Competitor.defaultProps = {
    product: {},
    onRemove: () => {},
    onAdd: () => {},
    addEnabled: true
}

export default Competitor;
