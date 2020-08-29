import {UserState} from "../states/user_state";
import {Dispatch} from "redux";
import {appActions} from "./app_action";
import {ThunkDispatch} from "redux-thunk";
import axios, {AxiosRequestConfig} from 'axios';
import {account_url, registration_url} from "../config/urls";
import {RegisterDTO} from "../dto/register_dto";
import {authenticateActionCreator} from "./authentication_action";
import {AuthenticationState} from "../states/authentication_state";
import {async} from "q";
import {UserDTO} from "../dto/user_dto";


export const SET_USER = "set_user";

interface SetUserAction {
    type: typeof SET_USER,
    payload: UserState
}

export type userActions = SetUserAction;



export const registerUser = async (dispatch : ThunkDispatch<{}, {}, appActions>, registerDTO: RegisterDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(registration_url, JSON.stringify(registerDTO), config).then((response) => {
        return 1;
    }).catch((error) => {
        return 0
    })
}


export const getUser = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
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
}