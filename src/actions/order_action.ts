import {CartState} from "../states/order_state";
import {MenuItemListState} from "../states/menu_item_state";


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