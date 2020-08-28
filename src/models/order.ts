import {Currency} from "../states/locale_state";


export interface Order {
    id: number,

    date: Date,

    totalPrice: number,

    paidIn: Currency

    delivered: boolean

    addressId: number,

    customerId: number,

    pizzariaId: number
}