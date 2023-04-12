import {constantsOfActions} from "@config/actions";
import {createChat} from "@utils/api";
import {createAddChatAction, createOpenChatAction} from "@actions/chatActions";
import { createMoveToChatAction } from "./routeActions";

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
                dispatch(createAddChatAction(jsonBody));
                dispatch(createMoveToChatAction({ chatId: jsonBody.id }));
                break;
            case 401:
            // TODO: отрендерить ошибку
            case 404:
            // TODO: отрендерить ошибку
            case 500:
            // TODO: отрендерить ошибку
            case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
            default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
}
