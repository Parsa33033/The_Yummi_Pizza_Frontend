
import {ManagerState} from "../states/manager_state";


export const SET_MANAGER = "set_manager"

interface SetManagerAction {
    type: typeof SET_MANAGER,
    payload: ManagerState
}

export type managerActions = SetManagerAction;