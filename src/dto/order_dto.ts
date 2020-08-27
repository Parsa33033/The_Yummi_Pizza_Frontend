import {Order} from "../models/order";
import {OrderItemDTO} from "./order_item_dto";
import {AddressDTO} from "./address_dto";


export interface OrderDTO extends Order {
    items: OrderItemDTO[]
    address: AddressDTO
}