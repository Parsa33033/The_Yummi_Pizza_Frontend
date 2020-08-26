import {userActions} from "./user_action";
import {authenticationActions} from "./authentication_action";
import {orderActions} from "./order_action";
import {customerActions} from "./cutomer_action";
import {pizzariaActions} from "./pizzaria_actions";
import {managerActions} from "./manager_action";


export type appActions = userActions |
                        authenticationActions |
                        orderActions |
                        customerActions |
                        pizzariaActions |
                        managerActions;