import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SportsForm from "components/sportsForm";
import SportsList from "components/sportsList";
import Header from "components/headers";
import SurveyForm from "components/surveyForm";
import * as routes from "constants/routes";

export default () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/sports/:id" component={SportsForm}/>
            <Route path="/sports" component={SportsList}/>
            <Route path="/test" component={SurveyForm}/>
            <Route path={routes.home} component={SportsList}/>
        </Switch>
    </BrowserRouter>
);
