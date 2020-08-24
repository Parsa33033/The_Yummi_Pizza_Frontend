import {Authentication} from "../models/authentication";

export const authenticationStateInit: AuthenticationState = {
    id_token: "Bearer "
}

export interface AuthenticationState extends Authentication {

}