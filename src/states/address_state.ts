import {Address} from "../models/address";


export const addressStateInit: AddressState = {
    address1: "",
    address2: "",
    city: "",
    country: "",
    id: 0,
    phoneNumber: "",
    state: "",
}

export interface AddressState extends Address{

}