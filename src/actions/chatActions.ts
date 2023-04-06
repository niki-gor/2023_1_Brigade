import { constantsOfActions } from "@/config/actions";
import { ChatTypes } from "@/config/enum";
import { createChat } from "@/utils/api";

export const createOpenChatActions = (chat: anyObject) => {
    //TODO: подписать страницу чата - вызвать роутер

    return {
        type: constantsOfActions.openChat,
        payload: chat,
    }
}

export const createAddChatActions = (chat: anyObject) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    }
}

export const createCreateDialogAction = (contact: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (st.type === ChatTypes.Dialog && st.members[0].id == contact.id) {
                return dispatch(createOpenChatActions(st));
            }
        }

        const { status, body } = await createChat({
            type: ChatTypes.Dialog,
            title: contact.nickname,
            members: [ contact.id, ]
        });

        let jsonBody = await body;

        switch (status) {
            case 201:
                dispatch(createAddChatActions(jsonBody));
                dispatch(createOpenChatActions(jsonBody));
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
