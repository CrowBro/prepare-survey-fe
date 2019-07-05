import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const HelloWorld = () => (
    <div>
        Hello World!
    </div>
);

export default () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" component={HelloWorld}/>
        </Switch>
    </BrowserRouter>
);