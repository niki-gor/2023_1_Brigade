import { constantsOfActions } from '@config/actions';
import { ChatTypes } from '@config/enum';
import { store } from '@store/store';
import {
    createChat,
    deleteChat,
    editChat,
    getChats,
    getOneChat,
} from '@utils/api';
import { router } from '@router/createRouter';
import { createMoveToChatAction } from './routeActions';

export const createIsNotRenderedAction = () => {
    return {
        type: constantsOfActions.isNotRendered,
        payload: null,
    };
};

export const createOpenChatAction = (chat: AnyObject) => {
    return {
        type: constantsOfActions.openChat,
        payload: chat,
    };
};

export const createAddChatAction = (chat: AnyObject) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    };
};

export const createSetChatsAction = (chat: AnyObject) => {
    return {
        type: constantsOfActions.setChats,
        payload: chat,
    };
};

export const createGetOneChatAction = (chat: AnyObject) => {
    return async (dispatch: (action: Action) => void) => {
        const { status, body } = await getOneChat(chat);

        const jsonBody = await body;

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
};

export const createGetChatsAction = () => {
    return async (dispatch: (action: Action) => void) => {
        const { status, body } = await getChats();

        const jsonBody = await body;

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
};

export const createCreateDialogAction = (contact: AnyObject) => {
    return async (dispatch: Dispatch, state: GetState) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (
                st.type === ChatTypes.Dialog &&
                (st.members[0]?.id == contact.id ||
                    st.members[1]?.id == contact.id)
            ) {
                return dispatch(createMoveToChatAction({ chatId: st.id }));
            }
        }

        const { status, body } = await createChat({
            type: ChatTypes.Dialog,
            title: contact.nickname,
            members: [contact.id, store.getState().user.id],
        });

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
};

/**
 *
 * @param chatId - id удаляемого чата
 * @returns
 */
export const createDeleteChatFromStoreAction = (chat: AnyObject) => {
    return {
        type: constantsOfActions.deleteChat,
        payload: chat,
    };
};

export const createDeleteChatAction = (deletedChatId: string) => {
    return async (dispatch: (action: Action) => void, state: GetState) => {
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
    };
};

// Нажимаем на кнопку save changes
export const createEditChatFromStoreAction = (updateGroupState: AnyObject) => {
    return {
        type: constantsOfActions.editChat,
        payload: updateGroupState,
    };
};

export const createEditChatAction = (updateGroupState: AnyObject) => {
    return async (dispatch: (action: Action) => void) => {
        if (updateGroupState) {
            dispatch(createEditChatFromStoreAction(updateGroupState));
        }

        const { status, body } = await editChat({
            id: updateGroupState.id,
            type: updateGroupState.type,
            title: updateGroupState.title,
            members: updateGroupState.members,
        });

        const jsonBody = await body;

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
    };
};
