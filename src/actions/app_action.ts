import {userActions} from "./user_action";
import {authenticationActions} from "./authentication_action";


export type appActions = userActions | authenticationActions;