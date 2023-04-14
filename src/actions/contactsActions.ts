import { ErrorComponent } from "@/containers/error/createError";
import {constantsOfActions} from "@config/actions";
import {getContacts} from "@utils/api";
import { createErrorAction } from "./errorActions";

export const createSetContactsAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setContacts,
        payload: state,
    }
}

export const createGetContactsAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getContacts();
        let jsonBody = await body;

        switch (status) {
            case 200:
                ErrorComponent.componentWillUnmount();
                return dispatch(createSetContactsAction(jsonBody));
            default:
                dispatch(createErrorAction(status, jsonBody));
                ErrorComponent.componentDidMount();
        }
    };
}
