import {CartState, cartStateInit, OrderState, orderStateInit} from "../states/order_state";
import {ADD_TO_CART, orderActions} from "../actions/order_action";


export const cartReducer = (state: CartState = cartStateInit, action: orderActions): CartState => {
    if (action.type == ADD_TO_CART) {
        return {
            items: action.payload.items != null ? action.payload.items : state.items
        }
    } else {
        return state;
    }
}