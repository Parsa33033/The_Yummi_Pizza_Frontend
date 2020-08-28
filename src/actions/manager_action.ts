import {ManagerState} from "../states/manager_state";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import axios, {AxiosRequestConfig} from "axios";
import {manager_url} from "../config/urls";
import {Gender} from "../models/gender";
import {ManagerDTO} from "../dto/manager_dto";


export const SET_MANAGER = "set_manager"

interface SetManagerAction {
    type: typeof SET_MANAGER,
    payload: ManagerState
}

export type managerActions = SetManagerAction;

export const getManager = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.get(manager_url, config).then((response) => {
        if (response.status == 200) {
            const manager: ManagerState = response.data
            manager.gender = manager.gender != null ? manager.gender.toString() == Gender[Gender.FEMALE] ? Gender.FEMALE : Gender.MALE : Gender.FEMALE
            dispatch({
                type: SET_MANAGER,
                payload: manager
            })
            return 1
        }
        return 0
    }).catch((e) => {
        return 0
    })
}


export const updateManager = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string, managerDTO: ManagerDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.put(manager_url, JSON.stringify(managerDTO), config).then((response) => {
        if (response.status == 200) {
            const managerState: ManagerState = response.data
            dispatch({
                type: SET_MANAGER,
                payload: managerState
            })
            return 1
        }
        return 0;
    }).catch((e) => {
        return 0;
    })
}

