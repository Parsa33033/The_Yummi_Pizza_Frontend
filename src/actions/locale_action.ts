import {LocaleState} from "../states/locale_state";


export const SWITCH_CURRENCY = "switch_currency"

interface SwitchCurrency {
    type: typeof SWITCH_CURRENCY,
    payload: LocaleState
}

export type localeActions = SwitchCurrency;