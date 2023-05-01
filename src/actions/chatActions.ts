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

export const createOpenChatAction = (chat: Chat) => {
    return {
        type: constantsOfActions.openChat,
        payload: chat,
    };
};

export const createAddChatAction = (chat: Chat) => {
    return {
        type: constantsOfActions.addChat,
        payload: chat,
    };
};

export const createSetChatsAction = (chat: Chat) => {
    return {
        type: constantsOfActions.setChats,
        payload: chat,
    };
};

export const createGetOneChatAction = (chat: Record<string, number>) => {
    return async (dispatch: Dispatch) => {
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
    return async (dispatch: Dispatch) => {
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

export const createCreateDialogAction = (contact: User) => {
    return async (dispatch: Dispatch, state: GetState) => {
        state().chats?.forEach((chat) => {
            if (
                chat.type === ChatTypes.Dialog &&
                (chat.members[0]?.id == contact.id ||
                    chat.members[1]?.id == contact.id)
            ) {
                return dispatch(createMoveToChatAction({ chatId: chat.id }));
            }
        });

        const { status, body } = await createChat({
            type: ChatTypes.Dialog,
            title: contact.nickname,
            members: [contact.id, store.getState().user?.id],
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
export const createDeleteChatFromStoreAction = (chat: Chat) => {
    return {
        type: constantsOfActions.deleteChat,
        payload: chat,
    };
};

export const createDeleteChatAction = (deletedChatId: number | undefined) => {
    return async (dispatch: Dispatch, state: GetState) => {
        if (!deletedChatId) {
            return;
        }

        state().chats?.forEach((chat) => {
            if (chat.id == deletedChatId) {
                dispatch(createDeleteChatFromStoreAction(chat));
            }
        });

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
export const createEditChatFromStoreAction = (updateGroupState: {
    id: number;
    type: ChatTypes;
    title: string;
    members: (number | undefined)[];
}) => {
    return {
        type: constantsOfActions.editChat,
        payload: updateGroupState,
    };
};

export const createEditChatAction = (updateGroupState: {
    id: number;
    type: ChatTypes;
    title: string;
    members: (number | undefined)[];
}) => {
    return async (dispatch: Dispatch) => {
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
    };
};
