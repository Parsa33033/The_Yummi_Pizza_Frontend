import {UserState} from "../states/user_state";
import {Dispatch} from "redux";
import {appActions} from "./app_action";
import {ThunkDispatch} from "redux-thunk";
import axios, {AxiosRequestConfig} from 'axios';
import {registration_url} from "../config/urls";
import {RegisterDTO} from "../dto/register_dto";
import {authenticateActionCreator} from "./authentication_action";
import {AuthenticationState} from "../states/authentication_state";


export const SET_USER = "set_user";

interface SetUserAction {
    type: typeof SET_USER,
    payload: UserState
}

export const setUserActionCreator = (state: UserState) : SetUserAction => {
    return {
        type: SET_USER,
        payload: state
    }
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
        if (error.response.status == 400) {
            return 2;
        }
        return 0
    })
}
