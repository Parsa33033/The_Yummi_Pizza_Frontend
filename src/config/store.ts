import {applyMiddleware, combineReducers, createStore} from "redux";
import {AppState} from "../states/app_state";
import {userReducer} from "../reducers/user_reducer";
import thunk from "redux-thunk";
import {authenticationReducer} from "../reducers/authentication_reducer";
import {pizzariaReducer} from "../reducers/pizzaria_reducer";
import {menuItemListReducer} from "../reducers/menu_item_reducer";
import {managerReducer} from "../reducers/manager_reducer";
import {customerReducer} from "../reducers/customer_reducer";
import {cartReducer} from "../reducers/order_reducer";

const reducers = combineReducers<AppState>({
    userState: userReducer,
    authentication: authenticationReducer,
    pizzariaState: pizzariaReducer,
    menuItemListState: menuItemListReducer,
    managerState: managerReducer,
    customerState: customerReducer,
    cartState: cartReducer
})

export const store = createStore(reducers, applyMiddleware(thunk))