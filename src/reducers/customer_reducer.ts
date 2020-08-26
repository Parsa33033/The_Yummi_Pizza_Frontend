import {CartState, cartStateInit} from "../states/order_state";
import {ADD_TO_CART, orderActions} from "../actions/order_action";
import {CustomerState, customerStateInit} from "../states/customer_state";
import {customerActions, SET_CUSTOMER} from "../actions/cutomer_action";

export const customerReducer = (state: CustomerState = customerStateInit, action: customerActions): CustomerState => {
    if (action.type == SET_CUSTOMER) {
        return {
            username: action.payload.username != null ? action.payload.username : state.username,
            orders: action.payload.orders != null ? action.payload.orders : state.orders,
            mobileNumber: action.payload.mobileNumber != null ? action.payload.mobileNumber : state.mobileNumber,
            lastName: action.payload.lastName != null ? action.payload.lastName : state.lastName,
            imageContentType: action.payload.imageContentType != null ? action.payload.imageContentType : state.imageContentType,
            image: action.payload.image != null ? action.payload.image : state.image,
            id: action.payload.id != null ? action.payload.id : state.id,
            gender: action.payload.gender != null ? action.payload.gender : state.gender,
            firstName: action.payload.firstName != null ? action.payload.firstName : state.firstName,
            email: action.payload.email != null ? action.payload.email : state.email,
            addressId: action.payload.addressId != null ? action.payload.addressId : state.addressId,
            address: action.payload.address != null ? action.payload.address : state.address,
        }
    } else {
        return state;
    }
}