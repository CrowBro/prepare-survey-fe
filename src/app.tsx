import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles, ThemeProvider } from "@material-ui/styles";
import SportsForm from "components/sportsForm";
import SportsList from "components/sportsList";
import Header from "components/headers";
import SurveyForm from "components/surveyForm";
import { Provider } from "react-redux";
import store from "store/store";
import DeTheme from "components/deTheme";
import { apiConfig } from "dataAccess/apiConfig";
import CallbackComponent from "components/callbackComponent";
import Help from "components/help";


const GlobalCss = withStyles({
    "@global": {
        ".MuiTableCell-root": {
            borderBottom: "0px"
        },
        "tr:nth-child(even)": {
            background: "#F4F5F8"
        },
        "tr:nth-child(odd)": {
            background: "#FFF"
        },
    }
})(() => null);

export default () => (
    <Provider store={store}>
        <GlobalCss />
        <CssBaseline />
        <ThemeProvider theme={DeTheme}>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route path="/auth" component={() => {
                        window.location.href =
                            `${apiConfig.authAuthUrl}?`
                            + `client_id=${apiConfig.authClientId}&`
                            + "response_type=token&"
                            + "state=ThisWillBeCountrySpace&"
                            + `redirect_uri=${apiConfig.authCallbackUrl}&`
                            + "scope=openid%20profile";
                        return null;
                    }} />
                    <Route path="/sports/:id" component={SportsForm} />
                    <Route path="/sports" component={SportsList} />
                    <Route path="/survey" component={SurveyForm} />
                    <Route path="/help" component={Help} />
                    <Route path="/api/login/callback" component={CallbackComponent} />
                    <Route path="/preparation/api/login/callback" component={CallbackComponent} />
                    <Route path="/" component={SportsList} />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    </Provider>
);
