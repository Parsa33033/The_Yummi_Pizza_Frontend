import {CartState} from "../states/order_state";
import {MenuItemListState, MenuItemState} from "../states/menu_item_state";
import {ThunkDispatch} from "redux-thunk";
import {appActions} from "./app_action";
import axios from "axios";
import {menu_item_list_url} from "../config/urls";


export const ADD_TO_CART = "add_to_cart"
export const SET_MENU_ITEM_LIST = "set_menu_item_list"

interface AddToCartAction {
    type: typeof ADD_TO_CART,
    payload: CartState
}

interface SetMenuItemListAction {
    type: typeof SET_MENU_ITEM_LIST,
    payload: MenuItemListState
}

export type orderActions = AddToCartAction | SetMenuItemListAction;


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