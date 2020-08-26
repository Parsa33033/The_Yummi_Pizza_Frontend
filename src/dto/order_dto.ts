import {Order} from "../models/order";
import {OrderItemDTO} from "./order_item_dto";


export interface OrderDTO extends Order {
    items: OrderItemDTO[]
}