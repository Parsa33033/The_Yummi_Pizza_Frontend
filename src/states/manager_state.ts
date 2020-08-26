import {Manager} from "../models/manager";
import {Gender} from "../models/gender";

export const managerStateInit: ManagerState = {
    email: "",
    firstName: "",
    gender: Gender.FEMALE,
    id: 0,
    image: "",
    imageContentType: "",
    lastName: "",
    mobileNumber: "",
    username: "",
}

export interface ManagerState extends Manager {
    
}