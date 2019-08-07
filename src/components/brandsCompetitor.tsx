import * as React from "react";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import ReactSelect, { OptionType } from "components/autoComplete";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import BorderedContainer from "components/borderedContainer";
import { BrandCompetitor } from "dataAccess/api";

interface CategoryProps {
    product: BrandCompetitor;
    onChange: (value: BrandCompetitor) => void;
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
    const { product, addEnabled, onAdd, onRemove, onChange } = props;

    return (
        <Grid container spacing={0} key={product.id}>
            <Grid item md={9}>
                <BorderedContainer maxWidth={"md"}>
                    <FormControl fullWidth>
                        <ReactSelect
                            label={"Name"}
                            options={options}
                            value={({ value: product.id, label: product.name || "Placeholder" })}
                            onChange={(value) => onChange({ id: value.value, name: value.label })}
                        />
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

export default Competitor;
