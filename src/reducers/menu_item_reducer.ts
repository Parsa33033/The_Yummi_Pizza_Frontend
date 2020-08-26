import {CartState, cartStateInit} from "../states/order_state";
import {ADD_TO_CART, orderActions, SET_MENU_ITEM_LIST} from "../actions/order_action";
import {MenuItemListState, menuItemListStateInit} from "../states/menu_item_state";

export const menuItemListReducer = (state: MenuItemListState = menuItemListStateInit, action: orderActions): MenuItemListState => {
    if (action.type == SET_MENU_ITEM_LIST) {
        return {
            items: action.payload.items != null ? action.payload.items : state.items
        }
    } else {
        return state;
    }
}