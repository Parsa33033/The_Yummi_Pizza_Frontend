import {OrderItem} from "../models/order_item";
import {MenuItemDTO} from "../dto/menu_item_dto";
import {MenuItemState, menuItemStateInit} from "./menu_item_state";
import {Order} from "../models/order";
import {OrderItemDTO} from "../dto/order_item_dto";


export const orderItemStateInit: OrderItemState = {
    id: 0,
    menuItem: menuItemStateInit,
    menuItemId: 0,
    number: 0,
    orderId: 0
}

export const cartStateInit: CartState = {
    items: [orderItemStateInit]
}

export const orderStateInit: OrderState = {
    addressId: 0,
    customerId: 0,
    date: new Date(),
    delivered: false,
    id: 0,
    items: [orderItemStateInit],
    pizzariaId: 0,
    totalPrice: 0
}

export const orderListStateInit: OrderListState = {
    orders: [orderStateInit]
}

export interface OrderItemState extends OrderItem {
    menuItem: MenuItemState
}

export interface CartState {
    items: OrderItemState[]
}

export interface OrderState extends Order{
    items: OrderItemState[]
}

export interface OrderListState {
    orders: OrderState[]
}