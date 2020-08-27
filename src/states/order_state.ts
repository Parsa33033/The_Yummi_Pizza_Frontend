import {OrderItem} from "../models/order_item";
import {MenuItemDTO} from "../dto/menu_item_dto";
import {MenuItemState, menuItemStateInit} from "./menu_item_state";
import {Order} from "../models/order";
import {OrderItemDTO} from "../dto/order_item_dto";
import {AddressState, addressStateInit} from "./address_state";


export const orderItemStateInit: OrderItemState = {
    id: 0,
    menuItem: menuItemStateInit,
    menuItemId: 0,
    number: 0,
    orderId: 0
}

export const cartStateInit: CartState = {
    items: []
}

export const orderStateInit: OrderState = {
    addressId: 0,
    customerId: 0,
    date: new Date(),
    delivered: false,
    id: 0,
    items: [],
    pizzariaId: 0,
    totalPrice: 0,
    address: addressStateInit
}

export const orderListStateInit: OrderListState = {
    orders: []
}

export interface OrderItemState extends OrderItem {
    menuItem: MenuItemState
}

export interface CartState {
    items: OrderItemState[]
}

export interface OrderState extends Order{
    items: OrderItemState[]
    address: AddressState
}

export interface OrderListState {
    orders: OrderState[]
}