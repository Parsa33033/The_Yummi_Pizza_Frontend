import {LocaleState, localeStateInit} from "../states/locale_state";
import {appActions} from "../actions/app_action";
import {SWITCH_CURRENCY} from "../actions/locale_action";


export const localeReducer = (state: LocaleState = localeStateInit, action: appActions) : LocaleState => {
    if (action.type == SWITCH_CURRENCY) {
        return {
            currency: action.payload.currency != null ? action.payload.currency : state.currency
        }
    } else {
        return state
    }
}