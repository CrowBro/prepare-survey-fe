import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TimerIcon from "@material-ui/icons/Timer";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core/styles";

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
                marginTop:0,
                top: 0,
                right: 0,
                bottom: 'auto',
                left: 0,
                position: 'fixed',
                backgroundColor: theme.palette.background.paper,
                zIndex: 10000,
        },

    }),
);

const Header = (props: RouteComponentProps) => {
    const classes = useStyles();
    const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        props.history.push(value);

    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <div className={classes.floatOnTop}>
                    <AntTabs value={props.location.pathname} onChange={handleChange}>
                        <AntTab value={"/sports"} label={<><div className={classes.margin}><TimerIcon fontSize ="inherit"  />&nbsp;&nbsp;&nbsp;Sports</div></>} />
                        <AntTab value={"/survey"} label={<><div className={classes.margin}><AssignmentIcon fontSize ="inherit" />&nbsp;&nbsp;&nbsp;Survey</div></>} />
                    </AntTabs>
                </div>
            </AppBar>
        </div>
    );
}
export default withRouter(Header);

