import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppState} from "../states/app_state";
import {userReducer} from "../reducers/user_reducer";
import thunk from "redux-thunk";
import {authenticationReducer} from "../reducers/authentication_reducer";

const reducers = combineReducers<AppState>({
    userState: userReducer,
    authentication: authenticationReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))