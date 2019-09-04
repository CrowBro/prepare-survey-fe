import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { apiConfig } from "dataAccess/apiConfig";
import * as QueryString from "query-string";


const CallbackComponent = (props: RouteComponentProps) => {

    let hash = props.location.hash;
    const parsed = QueryString.parse(hash);
    const authHeader = `${parsed.token_type} ${parsed.access_token}`;
    const moveToSports = (state: { countrySpace: string; authHeader: string }) => props.history.push({
        pathname: "/sports",
        state: state
    });

    let currentCountry = String(parsed.state);

    currentCountry = "fr"; //todo kb: make this work.

    useEffect(() => {
        moveToSports({ countrySpace: currentCountry, authHeader: authHeader });
    }, []);


    return (
        <div style={{ padding: 20, marginTop: 100 }}>
            {"Redirecting"}
        </div>
    )
}

export default withRouter(CallbackComponent);
