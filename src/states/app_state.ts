import {UserState, userStateInit} from "./user_state";
import {AuthenticationState, authenticationStateInit} from "./authentication_state";
import {CartState, cartStateInit} from "./order_state";
import {MenuItemListState, menuItemListStateInit} from "./menu_item_state";
import {CustomerState, customerStateInit} from "./customer_state";
import {PizzariaState, pizzariaStateInit} from "./pizzaria_state";
import {ManagerState, managerStateInit} from "./manager_state";
import {LocaleState, localeStateInit} from "./locale_state";

export const appStateInit: AppState = {
    userState: userStateInit,
    authentication: authenticationStateInit,
    cartState: cartStateInit,
    customerState: customerStateInit,
    managerState: managerStateInit,
    menuItemListState: menuItemListStateInit,
    pizzariaState: pizzariaStateInit,
    localeState: localeStateInit
}

export interface AppState {
    userState: UserState,
    authentication: AuthenticationState,
    cartState: CartState,
    menuItemListState: MenuItemListState,
    customerState: CustomerState,
    pizzariaState: PizzariaState,
    managerState: ManagerState,
    localeState: LocaleState
}