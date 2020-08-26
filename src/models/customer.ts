import {Gender} from "./gender";


export interface Customer {

    id: number,

    username: string,

    email: string,

    firstName: string,

    lastName: string,

    mobileNumber: string,

    gender: Gender,

    image: string,

    imageContentType: string,

    addressId: number,
}
