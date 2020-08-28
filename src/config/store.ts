import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppState} from "../states/app_state";
import {userReducer} from "../reducers/user_reducer";
import thunk from "redux-thunk";
import {authenticationReducer} from "../reducers/authentication_reducer";
import {pizzariaReducer} from "../reducers/pizzaria_reducer";
import {menuItemListReducer} from "../reducers/menu_item_reducer";
import {managerReducer} from "../reducers/manager_reducer";
import {customerReducer} from "../reducers/customer_reducer";
import {cartReducer, orderReducer} from "../reducers/order_reducer";
import {localeReducer} from "../reducers/localeReducer";

const reducers = combineReducers<AppState>({
    userState: userReducer,
    authentication: authenticationReducer,
    pizzariaState: pizzariaReducer,
    menuItemListState: menuItemListReducer,
    managerState: managerReducer,
    customerState: customerReducer,
    cartState: cartReducer,
    localeState: localeReducer,
    orderListState: orderReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))