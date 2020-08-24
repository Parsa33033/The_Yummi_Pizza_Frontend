import {UserState, userStateInit} from "./user_state";
import {AuthenticationState, authenticationStateInit} from "./authentication_state";

export const appStateInit: AppState = {
    userState: userStateInit,
    authentication: authenticationStateInit
}

export interface AppState {
    userState: UserState
    authentication: AuthenticationState
}