interface Country {
    id: number;
    name: string;
    shortName: string;
}


export interface SetCountry {
    type: "SetCountry";
    country: Country;
}

export type SettingsActions = SetCountry;
