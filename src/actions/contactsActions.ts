import {constantsOfActions} from "@config/actions";

export const createContactsAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.getContacts,
        payload: state,
    }
}
