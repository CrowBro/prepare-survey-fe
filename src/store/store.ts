import { createStore, combineReducers } from "redux";
import { settingsReducer } from "store/settings/reducer";
import { SettingsActions } from "store/settings/actions";

export type RootActions = SettingsActions;

const rootReducer = combineReducers({
    settings: settingsReducer
})

export type RootState = ReturnType<typeof rootReducer>;

export type Dispatch = (action: RootActions) => void;

const store = createStore<RootState, RootActions, {}, {}>(
    combineReducers({
        settings: settingsReducer
    })
)

export default store;
