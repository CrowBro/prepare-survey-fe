import * as React from "react";
import { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as QueryString from "query-string";
import { checkValidity } from "dataAccess/api";


const CallbackComponent = (props: RouteComponentProps) => {

    let hash = props.location.hash;
    const parsed = QueryString.parse(hash);
    const authHeader = `${parsed.token_type} ${parsed.access_token}`;
    const [isRedirecting, setIsRedirecting] = useState<boolean>(true);

    const moveToSports = (state: { countrySpace: string; authHeader: string }) => props.history.push({
        pathname: "/sports",
        state: state
    });

    let currentCountry = String(parsed.state);
    currentCountry = "fr"; //todo kb: make this work.

    const redirectOnValid = async (authHeader: string) => {
        if (await checkValidity(authHeader) === 200) {
            setIsRedirecting(true);
            moveToSports({ countrySpace: currentCountry, authHeader: authHeader });
        } else {
            setIsRedirecting(false);
        }

    };

    useEffect(() => {
        redirectOnValid(authHeader);
    }, []);


    return (
        <div style={{ padding: 20, marginTop: 100 }}>
            {isRedirecting ? "Redirecting" : "Either not registerred or not authenticated for the Survey Preparation Platform"}
        </div>
    )
}

export default withRouter(CallbackComponent);
