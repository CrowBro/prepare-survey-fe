import * as React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AddCircle from "@material-ui/icons/AddCircle";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { List } from "immutable";
import BrandsCompetitor from "components/brandsCompetitor";
import { BrandCompetitor } from "dataAccess/api";

interface CompetitorBrandsFormProps {
    authHeader: string;
    currentCountry: string;
    competitors: List<BrandCompetitor>;
    onChange: (action: (competitors: List<BrandCompetitor>) => List<BrandCompetitor>) => void;
}

const CompetitorBrandsForm = ({ authHeader, currentCountry, competitors, onChange }: CompetitorBrandsFormProps) => {
    return (
        <Grid item lg={12}>
            <Paper>
                <Grid item lg={12}>
                    <Container maxWidth={"lg"}>
                        <Toolbar>
                            <Typography variant={"h5"} color="primary">Brand's Competitor Details</Typography>
                        </Toolbar>
                    </Container>
                    <Divider />
                </Grid>
                <Grid container spacing={0}>
                    {
                        competitors.isEmpty()
                            ? <AddCircle color="primary" onClick={() => onChange(s => s.push({ id: 0, name: "", order: 1, history: "" }))} />
                            : <>
                                {
                                    competitors.map((brand: BrandCompetitor, index: number) => (
                                        <BrandsCompetitor
                                            authHeader={authHeader}
                                            currentCountry={currentCountry}
                                            key={index}
                                            brand={brand}
                                            onChange={(value) => onChange(s => s.set(index, value))}
                                            addEnabled={competitors.count() < 6}
                                            onAdd={() => onChange(s => s.insert(index + 1, { id: 0, name: "", order: brand.order, history: brand.history }))}
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
