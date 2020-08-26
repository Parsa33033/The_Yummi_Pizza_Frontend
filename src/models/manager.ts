import {Gender} from "./gender";


export interface Manager {
    id: number,

    username: string,

    email: string,

    firstName: string,

    lastName: string,

    mobileNumber: string,

    gender: Gender,

    image: string,

    imageContentType: string,
}