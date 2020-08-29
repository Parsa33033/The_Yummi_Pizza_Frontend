import {getUser, SET_USER, userActions} from "./user_action";
import {AUTHENTICATE, authenticationActions} from "./authentication_action";
import {getMenuItemList, orderActions, SET_ORDER_LIST} from "./order_action";
import {customerActions, getCustomer, SET_CUSTOMER} from "./cutomer_action";
import {getPizzaria, pizzariaActions} from "./pizzaria_actions";
import {managerActions, SET_MANAGER} from "./manager_action";
import {localeActions} from "./locale_action";
import {ThunkDispatch} from "redux-thunk";
import {AuthenticationState, authenticationStateInit} from "../states/authentication_state";
import {userStateInit} from "../states/user_state";
import {customerStateInit} from "../states/customer_state";
import {managerStateInit} from "../states/manager_state";
import {orderListStateInit} from "../states/order_state";


export type appActions = userActions |
                        authenticationActions |
                        orderActions |
                        customerActions |
                        pizzariaActions |
                        managerActions|
                        localeActions;


export const appInit = async (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    getPizzaria(dispatch)
    getMenuItemList(dispatch)
    var jwt = await localStorage.getItem("jwt")
    if (jwt != null && jwt != "") {
        const authentication: AuthenticationState = {
            id_token: jwt,
            authenticated: true
        }
        dispatch({
            type: AUTHENTICATE,
            payload: authentication
        })
        var i = await getUser(dispatch, jwt)
        if(i == 1) {
            i = await getCustomer(dispatch, jwt)
            if (i == 1) {
                return 1
            } else {
                return 0
            }
        } else {
            return 0
        }
    } else {
       return -1;
    }
}

export const logout = async (dispatch: ThunkDispatch<{}, {}, appActions>) => {
    localStorage.removeItem("jwt")
    dispatch({
        type: AUTHENTICATE,
        payload: authenticationStateInit
    })
    dispatch({
        type: SET_USER,
        payload: userStateInit
    })
    dispatch({
        type: SET_CUSTOMER,
        payload: customerStateInit
    })
    dispatch({
        type: SET_MANAGER,
        payload: managerStateInit,
    })
    dispatch({
        type: SET_ORDER_LIST,
        payload: orderListStateInit
    })

}