import {AuthenticationState} from "../states/authentication_state";


export const AUTHENTICATE = "authenticate"

interface AuthenticateAction {
    type: typeof AUTHENTICATE,
    payload: AuthenticationState
}

export const authenticateActionCreator = (state: AuthenticationState) : AuthenticateAction => {
    return {
        type: AUTHENTICATE,
        payload: state
    }
}

export type authenticationActions = AuthenticateAction;