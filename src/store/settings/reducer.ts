import { SettingsActions } from "./actions";

export const settingsReducer = (state: {} = {}, action: SettingsActions): {} => {
    switch(action.type) {
        case "SetCountry": {
            return {
                ...state,
                country: action.country
            };
        }
        default: {
            return state;
        }
    }
}
