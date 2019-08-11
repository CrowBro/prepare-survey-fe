import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const Header = (props: RouteComponentProps) => {

    const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        props.history.push(value);
    }

    return (
        <AppBar position="static">
            <Tabs value={props.location.pathname} onChange={handleChange}>
                <Tab label="Sports" value={"/sports"}/>
                <Tab label="Survey" value={"/survey"}/>
            </Tabs>
        </AppBar>
    );
}

export default withRouter(Header);

