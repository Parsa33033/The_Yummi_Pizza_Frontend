import {CustomerState} from "../states/customer_state";


export const SET_CUSTOMER = "set_customer"

interface SetCustomerAction {
    type: typeof SET_CUSTOMER,
    payload: CustomerState
}

export type customerActions = SetCustomerAction;