import {User} from "../models/user";


export interface RegisterDTO extends User {
    password: string,
}