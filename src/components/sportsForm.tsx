import * as React from "react";
import { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { List } from "immutable";
import DetailsForm from "components/sportDetailsForm";
import CategoryDetailsForm from "components/productCategories";
import BrandsCompetitorsForm from "components/brandsCompetitorsForm";
import {
    SportDetailsCouple,
    getSportDetails,
    ProductCategory,
    getProductCategories,
    BrandCompetitor,
    getCompetitorBrands,
    saveSportDetails,
    saveProductCategories,
    saveCompetitorBrands
} from "dataAccess/api";

// TODO: parametrize
const SportsForm = (props: RouteComponentProps<{id: string}>) => {
    const id = Number(props.match.params.id);
    const [ details, setDetails ] = useState<SportDetailsCouple | null>(null);
    const [ categories, setCategories ] = useState<List<ProductCategory> | null>(null);
    const [ competitors, setCompetitors ] = useState<List<BrandCompetitor> | null>(null);
    let isMounted = true;

    useEffect(() => {
        getSportDetails(id)
            .then(resp => {
                if(isMounted) {
                    setDetails(resp);
                }
            })

        getProductCategories(id)
            .then(resp => {
                if(isMounted) {
                    setCategories(List(resp));
                }
            })

        getCompetitorBrands(id)
            .then(resp => {
                if(isMounted) {
                    setCompetitors(List(resp));
                }
            })
        return () => {
            isMounted = false;
        };
    }, [ id ])

    const handleSave = () => {
        if(details && categories && competitors) {
            Promise.all([
                saveSportDetails(id, details),
                saveProductCategories(id, categories.toArray()),
                saveCompetitorBrands(id, competitors.toArray())
            ])
                .then(() => props.history.push("/sports"));
        }
    }

    return (
        <Container maxWidth={"md"}>
            <Grid
                justify="center"
                direction="row"
                container
                spacing={2}
            >
                { details
                    ? <DetailsForm details={details} onChange={setDetails}/>
                    : <div> Loading... </div>
                }
                { categories
                    ? <CategoryDetailsForm categories={categories} onChange={setCategories}/>
                    : <div> Loading... </div>
                }
                { competitors
                    ? <BrandsCompetitorsForm competitors={competitors} onChange={setCompetitors}/>
                    : <div> Loading... </div>
                }
                <Button size={"large"} color={"primary"} onClick={handleSave}>
                    Save
                </Button>
            </Grid>
        </Container>
    );
}

export default withRouter(SportsForm);
