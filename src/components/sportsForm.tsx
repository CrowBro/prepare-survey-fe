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
import { makeStyles, createStyles, useTheme, Theme  } from "@material-ui/styles";
import SaveIcon from '@material-ui/icons/Save';

import {
    SportDetails,
    getSportDetails,
    ProductCategory,
    getProductCategories,
    BrandCompetitor,
    getCompetitorBrands,
    saveSportDetails,
    saveProductCategories,
    saveCompetitorBrands
} from "dataAccess/api";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
        margin: theme.spacing(1),
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',

    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    gridMargin: {
        margin: "10px",
    },
  }),
);

const SportsForm = (props: RouteComponentProps<{id: string}>) => {
    const classes = useStyles();
    const id = Number(props.match.params.id);
    const [ details, setDetails ] = useState<SportDetails | null>(null);
    const [ benchmarkDetails, setBenchmarkDetails ] = useState<SportDetails | null>(null);
    const [ categories, setCategories ] = useState<List<ProductCategory> | null>(null);
    const [ competitors, setCompetitors ] = useState<List<BrandCompetitor> | null>(null);
    let isMounted = true;

    useEffect(() => {
        getSportDetails(id)
            .then(resp => {
                if(isMounted) {
                    setDetails(resp.targetSport);
                    setBenchmarkDetails(resp.benchmarkSport);
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
                className={classes.gridMargin}
            >
                { details && benchmarkDetails
                    ? <DetailsForm details={details} benchmarkDetails={benchmarkDetails} onChange={setDetails}/>
                    : <div> Loading... </div>
                }
                { categories
                    ? <CategoryDetailsForm categories={categories} sportId={id} onChange={setCategories}/>
                    : <div> Loading... </div>
                }
                { competitors
                    ? <BrandsCompetitorsForm competitors={competitors} onChange={setCompetitors}/>
                    : <div> Loading... </div>
                }
                <Button variant={"contained"} size={"large"} className={classes.fab} color={"primary"} onClick={handleSave}>
                    <SaveIcon className={classes.extendedIcon} /> Save
                </Button>
            </Grid>
        </Container>
    );
}

export default withRouter(SportsForm);
