import {OrderItem} from "../models/order_item";
import {MenuItemState, menuItemStateInit} from "./menu_item_state";
import {Order} from "../models/order";
import {AddressState, addressStateInit} from "./address_state";
import {Currency} from "./locale_state";


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
    paidIn: Currency.DOLLOR,
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