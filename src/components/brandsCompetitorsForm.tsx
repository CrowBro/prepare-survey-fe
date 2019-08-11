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
import * as uuid from "uuid";

interface CompetitorBrandsFormProps {
    competitors: List<BrandCompetitor>;
    onChange: (action: (competitors: List<BrandCompetitor>) => List<BrandCompetitor>) => void;
}

const CompetitorBrandsForm = ({ competitors, onChange }: CompetitorBrandsFormProps) => {
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
                        competitors.isEmpty()
                            ? <AddCircle color="primary" onClick={() => onChange(s => s.push({ id: 0, name: "" }))} />
                            : <>
                            {
                                competitors.map((product: BrandCompetitor, index: number) => (
                                    <BrandsCompetitor
                                        key={uuid()}
                                        product={product}
                                        onChange={(value) => onChange(s => s.set(index, value))}
                                        addEnabled={competitors.count() < 4}
                                        onAdd={() => onChange(s => s.insert(index + 1, { id: 0, name: "" }))}
                                        onRemove={() => onChange(s => s.remove(index))}
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

export default CompetitorBrandsForm;
