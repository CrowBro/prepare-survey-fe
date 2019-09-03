import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CountrySpace } from "dataAccess/api";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { apiConfig } from "dataAccess/apiConfig";

const countryDict: { [countrySpace: string]: string } = {
    "fr": "France",
    "ch": "China",
    "it": "Italy",
    "es": "Spain",
}

const AntTabs = withStyles(theme => ({
    root: {
    },
    indicator: {
        backgroundColor: theme.palette.primary.main
    },
}))(Tabs);

const AntTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 100,
            fontSize: "18px",
            marginRight: theme.spacing(4),
            verticalAlign: "middle",
            color: "#000",
            "&:hover": {
                color: theme.palette.primary.light
            },
            "&$selected": {
                color: theme.palette.primary.main
            },
            "&:focus": {
                color: theme.palette.primary.main
            },
        },
        selected: {},
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

interface StyledTabProps {
    value: string;
    label: JSX.Element;
}



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        whiteBackground: {
            backgroundColor: theme.palette.background.paper,
        },
        margin: {
            margin: theme.spacing(1),
            marginRight: theme.spacing(3),
        },
        floatOnTop: {
            margin: theme.spacing(1),
            marginTop: 0,
            top: 0,
            right: 0,
            bottom: "auto",
            left: 0,
            position: "fixed",
            backgroundColor: theme.palette.background.paper,
            zIndex: 10000,
        },

    }),
);

const Header = (props: RouteComponentProps) => {
    let currentCountry = "";
    if (props.location.state != null) {
        currentCountry = props.location.state.countrySpace
        console.log("headers chose state:", currentCountry);
    } else {
        currentCountry = apiConfig.defaultCountrySpace;
        console.log("headers chose default:", currentCountry)
    }
    // const currentCountry = props.location.state != null ? props.location.state.countrySpace : apiConfig.defaultCountrySpace;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<any>(null);
    const [anchorElCountrySpace, setAnchorElCountrySpace] = useState<any>(null);
    const [_, setCountrySpace] = useState<CountrySpace>(apiConfig.defaultCountrySpace);
    const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        props.history.push({
            pathname: value,
            state: { countrySpace: currentCountry }
        });
    }

    const handleClickCountrySpace = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("handleClickCountrySpace");
        setAnchorElCountrySpace(event.currentTarget);
    }

    const handleChangeCountrySpace = (value: CountrySpace) => {
        console.log("handleChangeCountrySpace");
        setCountrySpace(value);
        setAnchorElCountrySpace(null);
        props.history.push({
            pathname: '/sports',
            state: { countrySpace: value }
        });
    }

    const handleCloseCountrySpaceSelector = (value: CountrySpace) => {
        console.log("handleCloseCountrySpaceSelector");
        setAnchorElCountrySpace(null);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className={classes.floatOnTop}>
                    <AntTabs value={props.location.pathname} onChange={handleChange}>
                        <AntTab value={"/sports"} label={<><div className={classes.margin}><TimerIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Sports</div></>} />
                        <AntTab value={"/survey"} label={<><div className={classes.margin}><AssignmentIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Survey</div></>} />
                        <AntTab value={""} label={<div>
                        </div>
                        } />
                    </AntTabs>
                    <Button onClick={handleClickCountrySpace}>{`Choose country: ${countryDict[currentCountry]}`}</Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorElCountrySpace}
                        keepMounted
                        open={!!anchorElCountrySpace}
                        onClose={handleCloseCountrySpaceSelector}
                    >
                        <MenuItem onClick={() => handleChangeCountrySpace("fr")}>{countryDict["fr"]}</MenuItem>
                        <MenuItem onClick={() => handleChangeCountrySpace("fr")}>{countryDict["fr"]}</MenuItem>
                        <MenuItem onClick={() => handleChangeCountrySpace("es")}>{countryDict["es"]}</MenuItem>
                        <MenuItem onClick={() => handleChangeCountrySpace("it")}>{countryDict["it"]}</MenuItem>
                        <MenuItem onClick={() => handleChangeCountrySpace("ch")}>{countryDict["ch"]}</MenuItem>
                    </Menu>

                </div>
            </AppBar>
        </div>
    );
}
export default withRouter(Header);

