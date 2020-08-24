import {UserState, userStateInit} from "../states/user_state";
import {SET_USER, userActions} from "../actions/user_action";


export const userReducer = (state: UserState = userStateInit, action: userActions) : UserState => {
    if (action.type == SET_USER) {
        return {
            login: action.payload.login != null ? action.payload.login : state.login,
            lastName: action.payload.lastName != null ? action.payload.lastName : state.lastName,
            firstName: action.payload.firstName != null ? action.payload.firstName : state.firstName,
            email: action.payload.email != null ? action.payload.email : state.email,
        }
    } else {
        return state;
    }
}