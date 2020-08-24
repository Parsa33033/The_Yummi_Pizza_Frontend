import {User} from "../models/user";

export const userStateInit: UserState = {
    email: "",
    firstName: "",
    lastName: "",
    login: "",
}

export interface UserState extends User {

}