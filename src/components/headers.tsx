import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import * as routes from "constants/routes";

const Header = (props: RouteComponentProps) => {
    const handleChange = (event: React.ChangeEvent<{}>, value: string) => {
        props.history.push(value);
        console.log(value);
    }

    return (
        <AppBar position="static">
            <Tabs value={props.location.pathname} onChange={handleChange}>
                <Tab label="Home" value={routes.home} />
                <Tab label="Sports" value={routes.sportsList}/>
                <Tab label="Sports form" value={routes.sportsForm}/>
            </Tabs>
        </AppBar>
    );
}

export default withRouter(Header);

