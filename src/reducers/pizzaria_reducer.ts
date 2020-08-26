import {CartState, cartStateInit, OrderState, orderStateInit} from "../states/order_state";
import {ADD_TO_CART, orderActions} from "../actions/order_action";
import {PizzariaState, pizzariaStateInit} from "../states/pizzaria_state";
import {pizzariaActions, SET_PIZZARIA} from "../actions/pizzaria_actions";


export const pizzariaReducer = (state: PizzariaState = pizzariaStateInit, action: pizzariaActions): PizzariaState => {
    if (action.type == SET_PIZZARIA) {
        return {
            staff: action.payload.staff != null ? action.payload.staff : state.staff,
            pizzaBranches: action.payload.pizzaBranches != null ? action.payload.pizzaBranches : state.pizzaBranches,
            orders: action.payload.orders != null ? action.payload.orders : state.orders,
            openHours: action.payload.openHours != null ? action.payload.openHours : state.openHours,
            openDays: action.payload.openDays != null ? action.payload.openDays : state.openDays,
            numberOfAwards: action.payload.numberOfAwards != null ? action.payload.numberOfAwards : state.numberOfAwards,
            name: action.payload.name != null ? action.payload.name : state.name,
            managerId: action.payload.managerId != null ? action.payload.managerId : state.managerId,
            manager: action.payload.manager != null ? action.payload.manager : state.manager,
            items: action.payload.items != null ? action.payload.items : state.items,
            id: action.payload.id != null ? action.payload.id : state.id,
            description: action.payload.description != null ? action.payload.description : state.description,
            deliveryPrice: action.payload.deliveryPrice != null ? action.payload.deliveryPrice : state.deliveryPrice,
            customers: action.payload.customers != null ? action.payload.customers : state.customers,
            addressId: action.payload.addressId != null ? action.payload.addressId : state.addressId,
            address: action.payload.address != null ? action.payload.address : state.address,
        }
    } else {
        return state;
    }
}