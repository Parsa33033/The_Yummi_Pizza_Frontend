import {UserState, userStateInit} from "../states/user_state";
import {SET_USER, userActions} from "../actions/user_action";
import {AuthenticationState, authenticationStateInit} from "../states/authentication_state";
import {AUTHENTICATE, authenticationActions} from "../actions/authentication_action";


export const authenticationReducer = (state: AuthenticationState = authenticationStateInit, action: authenticationActions) : AuthenticationState => {
    if (action.type == AUTHENTICATE) {
        return {
            id_token: action.payload.id_token != null ? action.payload.id_token : state.id_token
        }
    } else {
        return state;
    }
}