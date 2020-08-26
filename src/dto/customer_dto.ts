import {Customer} from "../models/customer";
import {OrderDTO} from "./order_dto";
import {AddressDTO} from "./address_dto";


export interface CustomerDTO extends Customer{
    orders: OrderDTO[],
    address: AddressDTO

}