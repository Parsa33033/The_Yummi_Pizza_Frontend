import {Authentication} from "../models/authentication";

export const authenticationStateInit: AuthenticationState = {
    id_token: "Bearer ",
    authenticated: false
}

export interface AuthenticationState extends Authentication {

}