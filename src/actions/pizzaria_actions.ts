import {PizzariaState} from "../states/pizzaria_state";
import {async} from "q";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import axios, {AxiosRequestConfig} from "axios";
import {pizzaria_url} from "../config/urls";
import {PizzariaDTO} from "../dto/pizzaria_dto";


export const SET_PIZZARIA = "set_pizzaria"

interface SetPizzariaAction {
    type: typeof SET_PIZZARIA,
    payload: PizzariaState
}

export type pizzariaActions = SetPizzariaAction;


export const getPizzaria = async (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.get(pizzaria_url, config).then((response) => {
        if (response.status == 200) {
            var pizzaria: PizzariaDTO = response.data;
            dispatch({
                type: SET_PIZZARIA,
                payload: pizzaria
            })
            return 1;
        }
        return 0;
    }).catch((e) => {
        return 0;
    })
}