import {AuthenticationState} from "../states/authentication_state";
import {async} from "q";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import {RegisterDTO} from "../dto/register_dto";
import axios, {AxiosRequestConfig} from "axios";
import {login_url, password_reset_init_url, registration_url} from "../config/urls";
import {LoginDTO} from "../dto/login_dto";


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


export const loginUser = async (dispatch: ThunkDispatch<{}, {}, appActions>, loginDTO: LoginDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(login_url, JSON. stringify(loginDTO), config).then((response) => {
        const authentication: AuthenticationState = response.data
        authentication.authenticated = true
        dispatch({
            type: AUTHENTICATE,
            payload: authentication
        })
        localStorage.setItem("jwt", authentication.id_token)
        return 1;
    }).catch((error) => {
        if (error.response.status == 400) {
            return 2;
        }
        return 0
    })
}


export const sendPassResetEmail = async (email: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(password_reset_init_url, email, config).then((response) => {
        if (response.status == 200) {
            return 1
        } else {
            return 0
        }
    }).catch((e) => {
        return 0
        console.log("error: " + e.response.status)
    })
}