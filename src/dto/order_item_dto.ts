import {OrderItem} from "../models/order_item";
import {MenuItemDTO} from "./menu_item_dto";


export interface OrderItemDTO extends OrderItem{
    menuItem: MenuItemDTO

}