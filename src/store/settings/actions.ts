import { Country } from "dataAccess/countriesApi";

export interface SetCountry {
    type: "SetCountry";
    country: Country;
}

export type SettingsActions = SetCountry;
