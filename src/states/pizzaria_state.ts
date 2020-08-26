import {Pizzaria} from "../models/pizzaria";
import {ManagerDTO} from "../dto/manager_dto";
import {AddressDTO} from "../dto/address_dto";
import {OrderDTO} from "../dto/order_dto";
import {MenuItemDTO} from "../dto/menu_item_dto";
import {ManagerState, managerStateInit} from "./manager_state";
import {AddressState, addressStateInit} from "./address_state";
import {OrderState, orderStateInit} from "./order_state";
import {MenuItemState, menuItemStateInit} from "./menu_item_state";

export const pizzariaStateInit: PizzariaState = {
    address: addressStateInit,
    addressId: 0,
    customers: 0,
    deliveryPrice: 0,
    description: "",
    id: 0,
    items: [menuItemStateInit],
    manager: managerStateInit,
    managerId: 0,
    name: "",
    numberOfAwards: 0,
    openDays: "",
    openHours: "",
    orders: [orderStateInit],
    pizzaBranches: 0,
    staff: 0,
}


export interface PizzariaState extends Pizzaria {
    manager: ManagerState,
    address: AddressState,
    orders: OrderState[],
    items: MenuItemState[]
}