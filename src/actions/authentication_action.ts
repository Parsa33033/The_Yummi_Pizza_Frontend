import {AuthenticationState} from "../states/authentication_state";
import {async} from "q";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import {RegisterDTO} from "../dto/register_dto";
import axios, {AxiosRequestConfig} from "axios";
import {account_url, login_url, password_reset_init_url, registration_url} from "../config/urls";
import {LoginDTO} from "../dto/login_dto";
import {UserDTO} from "../dto/user_dto";
import {SET_USER} from "./user_action";
import {UserState} from "../states/user_state";


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
    return await axios.post(login_url, JSON. stringify(loginDTO), config).then(async (response) =>  {
        const authentication: AuthenticationState = response.data
        authentication.authenticated = true
        dispatch({
            type: AUTHENTICATE,
            payload: authentication
        })
        localStorage.setItem("jwt", authentication.id_token)
        const config: AxiosRequestConfig = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authentication.id_token
            }
        }
        return await axios.get(account_url, config).then((response) => {
            if (response.status == 200) {
                const userDTO: UserDTO = response.data
                const userState: UserState = {
                    authorities: userDTO.authorities,
                    firstName: userDTO.firstName,
                    lastName: userDTO.lastName,
                    login: userDTO.login,
                    email: userDTO.email
                }
                dispatch({
                    type: SET_USER,
                    payload: userState
                })
                return 1
            }
            return 0
        }).catch((e) => {
            // console.log("error: " + e.response.status)
            return 0
        })
    }).catch((error) => {
        // if (error.response.status == 400) {
        //     return 2;
        // }
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
        // console.log("error: " + e.response.status)
    })
}