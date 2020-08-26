import {User} from "../models/user";

export const userStateInit: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    login: "",
    authorities: []
}

export interface UserState extends User {

}