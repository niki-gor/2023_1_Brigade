import { constantsOfActions } from "@/config/actions";
import { ChatTypes } from "@/config/enum";
import { store } from "@/store/store";
import { createChat, deleteChat, editChat, getChats, getOneChat, searchChats } from "@/utils/api";
import { router } from "@router/createRouter";
import { createMoveToChatAction, createMoveToChatsAction } from "./routeActions";

export const createIsNotRenderedAction = () => {
    return {
        type: constantsOfActions.isNotRendered,
        payload: null,
    }
}

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
    return async (dispatch: (action: Action | AsyncAction) => void, state: Function) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (st.type === ChatTypes.Dialog && (st.members[0]?.id == contact.id || st.members[1]?.id == contact.id)) {
                dispatch(createMoveToChatsAction());
                return dispatch(createMoveToChatAction({ chatId: st.id }));
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
                dispatch(createMoveToChatsAction());
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

export const createDeleteChatAction = (deletedChatId: string) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        for (const key in state().chats) {
            const chat = state().chats[key];
            if (chat?.id == deletedChatId) {
                dispatch(createDeleteChatFromStoreAction(chat));
                break;
            }
        }

        const { status } = await deleteChat(deletedChatId);

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

// Нажимаем на кнопку save changes
export const createEditChatFromStoreAction = (updateGroupState: anyObject) => {
    return {
        type: constantsOfActions.editChat,
        payload: updateGroupState,
    }
}

export const createEditChatAction = (updateGroupState: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        if (updateGroupState) {
            dispatch(createEditChatFromStoreAction(updateGroupState));
        }

        const { status, body } = await editChat({
            id: updateGroupState.id,
            type: updateGroupState.type,
            title: updateGroupState.title,
            members: updateGroupState.members,
        });

        let jsonBody = await body;

        switch (status) {
            case 201:
                dispatch(createOpenChatAction(jsonBody));
                router.route(`/${updateGroupState.id}`);
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
    }
}

export const createCreateChannelAction = (channel: anyObject) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await createChat(channel);
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

export const createSearchChatsAction = (str: string) => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await searchChats(str);
        const jsonBody = await body;

        switch (status) {
            case 200:
                dispatch(createSetSearchedChatsAction(jsonBody));
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

export const createSetSearchedChatsAction = (body: anyObject) => {
    return {
        type: constantsOfActions.setSearchedChats,
        payload: body,
    }
}

export const createDeleteSearchedChatsAction = () => {
    return {
        type: constantsOfActions.deleteSearchedChats,
        payload: {
            founded_messages: undefined,
            founded_chats: undefined,
            founded_channels: undefined,
            founded_contacts: undefined,
        },
    }
}

export const createAddUserInChat = (user: anyObject) => {
    return {
        type: constantsOfActions.addUserInChat,
        payload: user,
    }
}

export const createDeleteUserInChat = () => {
    return {
        type: constantsOfActions.deleteUserInChat,
        payload: null,
    }
}