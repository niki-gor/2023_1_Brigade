import {constantsOfActions} from "@config/actions";
import {createGroup} from "@utils/api";
import {createAddChatAction, createOpenChatAction} from "@actions/chatActions";

export const createSetCreateGroupAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.createGroup,
        payload: state,
    }
}

export const createGetCreateGroupAction = (group: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await createGroup(group);
        const jsonBody = await body;

        switch (status) {
            case 201:
                dispatch(createAddChatAction(jsonBody));
                dispatch(createOpenChatAction(jsonBody));
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
