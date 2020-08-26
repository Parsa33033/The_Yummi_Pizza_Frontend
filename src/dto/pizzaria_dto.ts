import {Pizzaria} from "../models/pizzaria";
import {ManagerDTO} from "./manager_dto";
import {AddressDTO} from "./address_dto";
import {OrderDTO} from "./order_dto";
import {MenuItemDTO} from "./menu_item_dto";


export interface PizzariaDTO extends Pizzaria {
    manager: ManagerDTO,
    address: AddressDTO,
    orders: OrderDTO[],
    items: MenuItemDTO[]
}