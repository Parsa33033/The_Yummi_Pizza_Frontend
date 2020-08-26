import {CustomerState} from "../states/customer_state";
import {CustomerMessageDTO} from "../dto/customer_message_dto";
import axios, {AxiosRequestConfig} from "axios";
import {customer_message_url} from "../config/urls";

export const SET_CUSTOMER = "set_customer"

interface SetCustomerAction {
    type: typeof SET_CUSTOMER,
    payload: CustomerState
}

export type customerActions = SetCustomerAction;



export const sendCustomerMessage = async (message: CustomerMessageDTO) => {
    const config: AxiosRequestConfig = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(customer_message_url, JSON.stringify(message), config).then((response) => {
        if (response.status == 200) {
            return 1
        }
        return 0
    }).catch((e) => {
        return 0
    })
}