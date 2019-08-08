import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import SportsForm from "components/sportsForm";
import SportsList from "components/sportsList";
import Header from "components/headers";
import SurveyForm from "components/surveyForm";
import { Provider } from "react-redux";
import store from "store/store";

export default () => (
    <Provider store={store}>
        <CssBaseline>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/sports/:id" component={SportsForm}/>
                    <Route path="/sports" component={SportsList}/>
                    <Route path="/survey" component={SurveyForm}/>
                    <Route path="/" component={SportsList}/>
                </Switch>
            </BrowserRouter>
        </CssBaseline>
    </Provider>
);
