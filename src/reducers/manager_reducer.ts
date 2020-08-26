import {CartState, cartStateInit, OrderState, orderStateInit} from "../states/order_state";
import {ADD_TO_CART, orderActions} from "../actions/order_action";
import {ManagerState, managerStateInit} from "../states/manager_state";
import {managerActions, SET_MANAGER} from "../actions/manager_action";


export const managerReducer = (state: ManagerState = managerStateInit, action: managerActions): ManagerState => {
    if (action.type == SET_MANAGER) {
        return {
            username: action.payload.username != null ? action.payload.username : state.username,
            mobileNumber: action.payload.mobileNumber != null ? action.payload.mobileNumber : state.mobileNumber,
            lastName: action.payload.lastName != null ? action.payload.lastName : state.lastName,
            imageContentType: action.payload.imageContentType != null ? action.payload.imageContentType : state.imageContentType,
            image: action.payload.image != null ? action.payload.image : state.image,
            id: action.payload.id != null ? action.payload.id : state.id,
            gender: action.payload.gender != null ? action.payload.gender : state.gender,
            firstName: action.payload.firstName != null ? action.payload.firstName : state.firstName,
            email: action.payload.email != null ? action.payload.email : state.email,
        }
    } else {
        return state;
    }
}