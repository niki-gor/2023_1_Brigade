import {constantsOfActions} from "@config/actions";
import {createChat} from "@utils/api";
import {createAddChatAction, createOpenChatAction} from "@actions/chatActions";
import { createMoveToChatAction } from "./routeActions";
import { createErrorAction } from "./errorActions";
import { ErrorComponent } from "@/containers/error/createError";

export const createSetCreateGroupAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.createGroup,
        payload: state,
    }
}

export const createCreateGroupAction = (group: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await createChat(group);
        const jsonBody = await body;

        switch (status) {
            case 201:
                ErrorComponent.componentWillUnmount();
                dispatch(createAddChatAction(jsonBody));
                dispatch(createMoveToChatAction({ chatId: jsonBody.id }));
                break;
            default:
                dispatch(createErrorAction(status, jsonBody));
                ErrorComponent.componentDidMount();
        }
    };
}
