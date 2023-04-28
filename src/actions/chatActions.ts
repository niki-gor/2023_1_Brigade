import { constantsOfActions } from "@/config/actions";
import { ChatTypes } from "@/config/enum";
import { store } from "@/store/store";
import { createChat, deleteChat, editChat, getChats, getOneChat } from "@/utils/api";
import { router } from "@router/createRouter";
import { createMoveToChatAction } from "./routeActions";

/**
 * Создает экшен "isNotRendered".
 * @returns {{ type: string, payload: null }} - Экшен
 */
export const createIsNotRenderedAction = () => {
    return {
        type: constantsOfActions.isNotRendered,
        payload: null,
    }
}

/**
 * Создает экшен "openChat".
 * @param {Object} chat - Чат, который нужно открыть.
 * @returns {{ type: string, payload: Object }} - Экшен
 */
export const createOpenChatAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.openChat,
        payload: chat,
    }
}

/**
 * Создает экшен "addChat".
 * @param {Object} chat - Чат, который нужно добавить.
 * @returns {{ type: string, payload: Object }} - Экшен
 */
export const createAddChatAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    }
}

/**
 * Создает экшен "setChats".
 * @param {Object} chat - Список чатов, которые нужно установить.
 * @returns {{ type: string, payload: Object }} - Экшен
 */
export const createSetChatsAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.setChats,
        payload: chat,
    }
}

/**
 * Создает экшен "getOneChat".
 * @param {Object} chat - Чат, который нужно получить.
 * @returns {function} - Функция, которая делает запрос и возвращает промис с результатом.
 */
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

/**
 * Создает экшен "getOneChat".
 * @param {Object} chat - Чат, который нужно получить.
 * @returns {function} - Функция, которая делает запрос и возвращает промис с результатом.
 */
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

/**
 * Создает экшен "getChats".
 * @returns {function} - Функция, которая делает запрос и возвращает промис с результатом.
 */
export const createCreateDialogAction = (contact: anyObject) => {
    return async (dispatch: (action: Action | AsyncAction) => void, state: Function) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (st.type === ChatTypes.Dialog && (st.members[0]?.id == contact.id || st.members[1]?.id == contact.id)) {
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
 * Создает action для удаления чата из хранилища.
 * @param {anyObject} chat - Чат, который нужно удалить.
 * @returns {Object} - Экшен
 */
export const createDeleteChatFromStoreAction = (chat: anyObject) => {
    return {
        type: constantsOfActions.deleteChat,
        payload: chat,
    }
}

/**
 * Создает асинхронный экшен для удаления чата.
 * @param {string} deletedChatId - id чата, который нужно удалить.
 * @returns {Function} - асинхронная функция, которая принимает dispatch и возвращает Promise.
 */
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

/**
 * Создает action для изменения чата в хранилище.
 * @param {anyObject} updateGroupState - объект с обновленной информацией о чате.
 * @returns {Object} - Экшен
 */
export const createEditChatFromStoreAction = (updateGroupState: anyObject) => {
    return {
        type: constantsOfActions.editChat,
        payload: updateGroupState,
    }
}

/**
 * Создает асинхронный action для изменения чата.
 * @param {anyObject} updateGroupState - объект с обновленной информацией о чате.
 * @returns {Function} - асинхронная функция, которая принимает dispatch и возвращает Promise.
 */
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
                router.route(`/${updateGroupState.id}`);
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
    }
}