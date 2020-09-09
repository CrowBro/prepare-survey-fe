import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CountrySpace, checkValidity } from "dataAccess/api";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { apiConfig } from "dataAccess/apiConfig";
import FormLabel from "@material-ui/core/FormLabel";

const countryDict: { [countrySpace: string]: string } = {
    "fr": "France",
    "cn": "China",
    "it": "Italy",
    "es": "Spain",
    "cz": "Czech Republic",
    "de": "Germany",
    "in": "India",
    "sg": "Singapore",
    "co": "Colombia",
    "cl": "Chile",
    "pl": "Poland",
    "be": "Belgium",
    "tr": "Turkey",
    "uk": "United Kingdom",

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
        flexContainerCustom: {
            display: "flex"
        },
        moveToTheRight: {
            marginLeft: "auto",
            paddingTop: "14px",
            paddingBottom: "14px",
            paddingLeft: "8px",
            paddingRight: "8px",
        },
        stayOnTheLeft: {
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "8px",
            paddingRight: "8px",
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
    let authHeader = "";
    if (props.location.state != null) {
        currentCountry = props.location.state.countrySpace;
        authHeader = props.location.state.authHeader;
    } else {
        currentCountry = apiConfig.defaultCountrySpace;
    }

    const classes = useStyles();
    const [anchorElCountrySpace, setAnchorElCountrySpace] = useState<any>(null);
    const [user, setUser] = useState<string>("");
    const [_, setCountrySpace] = useState<CountrySpace>(apiConfig.defaultCountrySpace);
    const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        props.history.push({
            pathname: value,
            state: { countrySpace: currentCountry, authHeader: authHeader }
        });
    }

    const handleClickCountrySpace = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElCountrySpace(event.currentTarget);
    }

    const handleChangeCountrySpace = (value: CountrySpace) => {
        setCountrySpace(value);
        setAnchorElCountrySpace(null);
        props.history.push({
            pathname: "/sports",
            state: { countrySpace: value, authHeader: authHeader }
        });
    }

    const handleCloseCountrySpaceSelector = (value: CountrySpace) => {
        setAnchorElCountrySpace(null);
    }


    const getUserSet = async (authHeader: string) => {
        console.log(111111);
        console.log(authHeader.length);
        checkValidity(authHeader)
            .then((resp) => {
                console.log(2222222);
                if (resp.status === 401) {
                    console.log(333333333);

                    console.log(props.location.pathname);
                    if (!props.location.pathname.includes("/api/login/callback")) {
                        console.log(44444444444);

                        props.history.push({
                            pathname: "/auth",
                            state: { countrySpace: currentCountry, authHeader: authHeader }
                        });

                    } else {
                        console.log(5555555555);

                    }

                }
                else {
                    console.log(666666666666);
                    setUser(resp.user);
                }
            });

    };

    useEffect(() => {
        getUserSet(authHeader);
    }, []);



    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className={classes.floatOnTop}>
                    <div className={classes.flexContainerCustom}>
                        <AntTabs value={props.location.pathname} onChange={handleChange}>
                            <AntTab value={"/sports"} label={<><div className={classes.margin}><TimerIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Sports</div></>} />
                            <AntTab value={"/survey"} label={<><div className={classes.margin}><AssignmentIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Survey</div></>} />
                            <AntTab value={"/help"} label={<><div className={classes.margin}><HelpOutlineIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Help</div></>} />
                            <AntTab value={"/users"} label={<><div className={classes.margin}><HelpOutlineIcon fontSize="inherit" />&nbsp;&nbsp;&nbsp;Users</div></>} />
                        </AntTabs>
                        <div className={classes.stayOnTheLeft}>
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
                                <MenuItem onClick={() => handleChangeCountrySpace("cn")}>{countryDict["cn"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("cz")}>{countryDict["cz"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("de")}>{countryDict["de"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("in")}>{countryDict["in"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("sg")}>{countryDict["sg"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("co")}>{countryDict["co"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("cl")}>{countryDict["cl"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("pl")}>{countryDict["pl"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("be")}>{countryDict["be"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("tr")}>{countryDict["tr"]}</MenuItem>
                                <MenuItem onClick={() => handleChangeCountrySpace("uk")}>{countryDict["uk"]}</MenuItem>
                            </Menu>
                        </div>
                        <div className={classes.moveToTheRight}>
                            <FormLabel>{user}</FormLabel>
                        </div>
                    </div>
                </div>
            </AppBar>
        </div>
    );
}
export default withRouter(Header);

