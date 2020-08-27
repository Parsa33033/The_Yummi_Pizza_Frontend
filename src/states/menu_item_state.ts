import {FoodType, MenuItem} from "../models/menu_item";

export const menuItemStateInit: MenuItemState = {
    description: "",
    id: 0,
    ingredient: "",
    name: "",
    picJpg: "",
    picJpgContentType: "",
    picPng: "",
    picPngContentType: "",
    pizzariaId: 0,
    priceDollor: 0,
    priceEuro: 0,
    type: FoodType.PIZZA
}

export const menuItemListStateInit: MenuItemListState = {
    items: []
}

export interface MenuItemState extends MenuItem {

}

export interface MenuItemListState {
    items: MenuItemState[]
}