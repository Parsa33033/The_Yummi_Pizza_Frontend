

export interface Order {
    id: number,

    date: Date,

    totalPrice: number,

    delivered: boolean

    addressId: number,

    customerId: number,

    pizzariaId: number
}