import {CartState, OrderListState} from "../states/order_state";
import {MenuItemListState, MenuItemState} from "../states/menu_item_state";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import axios, {AxiosRequestConfig} from "axios";
import {menu_item_list_url, customer_order_url, order_url, order_delivered_url} from "../config/urls";
import {async} from "q";
import {OrderDTO} from "../dto/order_dto";
import {Order} from "../models/order";


export const ADD_TO_CART = "add_to_cart"
export const SET_CART = "set_cart"
export const SET_MENU_ITEM_LIST = "set_menu_item_list"
export const SET_ORDER_LIST = "set_order_list"

interface AddToCartAction {
    type: typeof ADD_TO_CART,
    payload: CartState
}

interface SetCartAction {
    type: typeof SET_CART,
    payload: CartState
}


interface SetOrderListAction {
    type: typeof SET_ORDER_LIST,
    payload: OrderListState
}

interface SetMenuItemListAction {
    type: typeof SET_MENU_ITEM_LIST,
    payload: MenuItemListState
}

export type orderActions = AddToCartAction | SetMenuItemListAction | SetCartAction | SetOrderListAction;


export const getMenuItemList = async (dispatch: ThunkDispatch<{}, {}, appActions>) => {

    return await axios.get(menu_item_list_url).then((response) => {
        if (response.status == 200) {
            const menuItems: MenuItemState[] = response.data;
            const menuItemList: MenuItemListState = {
                items: menuItems
            }
            dispatch({
                type: SET_MENU_ITEM_LIST,
                payload: menuItemList
            })
            return 1;
        }
        return 0
    }).catch((e) => {
        return 0
    })
}

export const order = async (orderDTO: OrderDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(customer_order_url, JSON.stringify(orderDTO), config).then((response) => {
        if (response.status == 200) {
            return 1;
        }
        return 0;
    }).catch((e) => {
        return 0;
    })
}

export const getAllOrders = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Authorization": "Bearer " + jwt
        }
    }

    return await axios.get(order_url, config).then((response) => {
        if (response.status == 200) {
            const orderListState: OrderListState = {
                orders: response.data
            }
            dispatch({
                type: SET_ORDER_LIST,
                payload: orderListState
            })
            return 1
        }
        return 0;
    }).catch((e) => {
        return 0;
    })

}

export const setOrderDelivered = async (dispatch: ThunkDispatch<{}, {}, appActions>, jwt: string, order: Order, index: number, orderListState: OrderListState) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + jwt
        }
    }
    return await axios.post(order_delivered_url, JSON.stringify(order), config).then((response) => {
        if (response.status == 200) {
            orderListState.orders[index].delivered = order.delivered;
            dispatch({
                type: SET_ORDER_LIST,
                payload: orderListState
            })
            return 1
        }
        return 0;
    }).catch((e) => {
        return 0;
    })

}