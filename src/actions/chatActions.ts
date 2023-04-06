import { constantsOfActions } from "@/config/actions";
import { createChat } from "@/utils/api";

export const createAddChatActions = (chat: anyObject) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    }
}

export const createCreateDialogAction = (contact: anyObject) => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await createChat({
            type: ChatTypes.Dialog,
            title: contact.nickname,
            members: [ contact, ]
        });

        let jsonBody = await body;

        switch (status) {
            case 200:
                return dispatch(createAddChatActions(jsonBody));
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
