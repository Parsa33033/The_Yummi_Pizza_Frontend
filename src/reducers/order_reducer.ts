import {
    CartState,
    cartStateInit,
    OrderListState,
    orderListStateInit,
    OrderState,
    orderStateInit
} from "../states/order_state";
import {ADD_TO_CART, orderActions, SET_CART, SET_ORDER_LIST} from "../actions/order_action";


export const cartReducer = (state: CartState = cartStateInit, action: orderActions): CartState => {
    if (action.type == ADD_TO_CART) {
        return {
            items: action.payload.items != null ? action.payload.items : state.items
        }
    } else if (action.type == SET_CART) {
        return {
            items: action.payload.items != null ? action.payload.items : state.items
        }
    } else {
        return state;
    }
}



export const orderReducer = (state: OrderListState = orderListStateInit, action: orderActions): OrderListState => {
    if (action.type == SET_ORDER_LIST) {
        return {
            orders: action.payload.orders != null ? action.payload.orders : state.orders
        }
    } else {
        return state;
    }
}