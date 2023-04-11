import { constantsOfActions } from "@/config/actions";
import { ChatTypes } from "@/config/enum";
import { getWs } from "@/utils/ws";
import { store } from "@/store/store";
import { createChat, deleteChat, getChats, getOneChat } from "@/utils/api";
import { router } from "@/router/router";

export const createOpenChatAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.openChat,
        payload: chat,
    }
}

export const createAddChatAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    }
}

export const createSetChatsAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.setChats,
        payload: chat,
    }
}

export const createGetOneChatAction = (chat: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getOneChat(chat);

        let jsonBody = await body;

        switch (status) {
            case 200:
                dispatch(createOpenChatAction(jsonBody));
                break;
            case 401:
                // TODO: отрендерить ошибку
            case 403:
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

export const createGetChatsAction = () => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getChats();

        let jsonBody = await body;

        switch (status) {
            case 200:
                dispatch(createSetChatsAction(jsonBody));
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

export const createCreateDialogAction = (contact: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (st.type === ChatTypes.Dialog && st.members[0]?.id == contact.id) {
                return dispatch(createOpenChatAction(st));
            }
        }

        const { status, body } = await createChat({
            type: ChatTypes.Dialog,
            title: contact.nickname,
            members: [ contact.id, store.getState().user.id ],
        });

        let jsonBody = await body;

        switch (status) {
            case 201:
                dispatch(createAddChatAction(jsonBody));
                dispatch(createOpenChatAction(jsonBody));
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

/**
 * 
 * @param chatId - id удаляемого чата
 * @returns 
 */
export const createDeleteChatFromStoreAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.deleteChat,
        payload: chat,
    }
}

export const createDeleteChatAction = (deletedChat: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        for (const key in state().chats) {
            const chat = state().chats[key];
            if (chat?.id === deletedChat?.id) {
                dispatch(createDeleteChatFromStoreAction(chat));
            }
        }

        const { status } = await deleteChat({
            chat_id: deletedChat.id,
        });

        switch (status) {
            case 204:
                router.route('/');
                break;
            case 401:
                // TODO: отрендерить ошибку
            case 403:          
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
    }
}
