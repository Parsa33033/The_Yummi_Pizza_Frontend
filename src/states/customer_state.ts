import {Customer} from "../models/customer";
import {AddressState, addressStateInit} from "./address_state";
import {OrderState, orderStateInit} from "./order_state";
import {Gender} from "../models/gender";

export const customerStateInit: CustomerState = {
    address: addressStateInit,
    addressId: 0,
    email: "",
    firstName: "",
    gender: Gender.FEMALE,
    id: 0,
    image: "",
    imageContentType: "",
    lastName: "",
    mobileNumber: "",
    orders: [orderStateInit],
    username: "",
}

export interface CustomerState extends Customer {
    orders: OrderState[],
    address: AddressState
}