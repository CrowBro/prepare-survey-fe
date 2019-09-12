import * as React from "react";
import { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import ReactSelect, { OptionType } from "components/autoComplete";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { BrandCompetitor } from "dataAccess/api";
import { getBrands } from "dataAccess/brandsApi";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldSpacing: {
            marginTop: theme.spacing(3),
        },
        titleGrid: {
            marginTop: 6,
            textAlign: "right",
            paddingRight: 20
        },
        iconMargin: {
            marginLeft: 20
        }
    }),
);

interface CategoryProps {
    authHeader: string;
    currentCountry: string;
    brand: BrandCompetitor;
    onChange: (value: BrandCompetitor) => void;
    addEnabled: boolean;
    onAdd: () => void;
    onRemove: () => void;
}

const Competitor = (props: CategoryProps) => {
    const { authHeader, currentCountry, brand, addEnabled, onAdd, onRemove, onChange } = props;
    const [options, setOptions] = useState<OptionType<number>[]>([]);
    useEffect(() => {
        getBrands(authHeader, currentCountry)
            .then(resp => setOptions(resp.map(brand => ({ value: brand.id, label: brand.name }))))
    }, [])

    const classes = useStyles();

    return (
        <Grid className={classes.textFieldSpacing} container spacing={0} key={brand.id}>
            <Container maxWidth={"lg"}>
                <Grid container>
                    <Grid item xs={2} className={classes.titleGrid}>
                        <Typography>
                            Name
                        </Typography>
                    </Grid>
                    <Grid item lg={7}>
                        <FormControl fullWidth>
                            <FormControl fullWidth>
                                <ReactSelect
                                    label={""}
                                    options={options}
                                    value={({ value: brand.id, label: brand.name })}
                                    onChange={(value) => onChange({ id: value.value, name: value.label, order: 0, history: "" })}
                                    defaultT={0}
                                />
                                {brand.history &&
                                    <FormHelperText id="weight-helper-text">{`Previously: ${brand.history}`}</FormHelperText>
                                }
                            </FormControl>
                        </FormControl>
                    </Grid>
                    <Grid item lg={3}>
                        <div className={classes.iconMargin}>
                            {
                                addEnabled
                                    ? <AddCircle color="primary" onClick={onAdd} />
                                    : <AddCircle color="disabled" />
                            }
                            <RemoveCircle color="error" onClick={onRemove} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <Grid className={classes.textFieldSpacing} item lg={12}>
                <Divider />
            </Grid>
        </Grid>
    )
}

export default Competitor;
w