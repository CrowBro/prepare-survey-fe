import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SportsForm from "components/sportsForm";
import SportsList from "components/sportsList";
import Header from "components/headers";
import SurveyForm from "components/surveyForm";

export default () => (
    <BrowserRouter>
        <Header />
        <Switch>
            <Route path="/sports/:id" component={SportsForm}/>
            <Route path="/sports" component={SportsList}/>
            <Route path="/survey" component={SurveyForm}/>
            <Route path="/" component={SportsList}/>
        </Switch>
    </BrowserRouter>
);
