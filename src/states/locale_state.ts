


export enum Currency{
    EURO,
    DOLLOR
}

export const localeStateInit: LocaleState = {
    currency: Currency.DOLLOR
}

export interface LocaleState {
    currency: Currency
}

