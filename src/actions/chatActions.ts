import { constantsOfActions } from "@/config/actions";
import { ChatTypes } from "@/config/enum";
import { store } from "@/store/store";
import { createChat, deleteChat, editChat, getChats, getOneChat } from "@/utils/api";
import { router } from "@/router/router";
import { createMoveToChatAction } from "./routeActions";
import { createErrorAction } from "./errorActions";
import { ErrorComponent } from "@/containers/error/createError";

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
                ErrorComponent.componentWillUnmount();
                dispatch(createOpenChatAction(jsonBody));
                break;
            default:
                dispatch(createErrorAction(status, jsonBody));
                ErrorComponent.componentDidMount();
        }
    };
}

export const createGetChatsAction = () => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getChats();

        let jsonBody = await body;

        switch (status) {
            case 200:
                ErrorComponent.componentWillUnmount();
                dispatch(createSetChatsAction(jsonBody));
                break;
            default:
                dispatch(createErrorAction(status, jsonBody));
                ErrorComponent.componentDidMount();
        }
    };
}

export const createCreateDialogAction = (contact: anyObject) => {
    return async (dispatch: (action: Action | AsyncAction) => void, state: Function) => {
        for (const key in state().chats) {
            const st = state().chats[key];
            if (st.type === ChatTypes.Dialog && st.members[0]?.id == contact.id) {
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
                ErrorComponent.componentWillUnmount();
                router.route('/');
                break;
            default:
                // dispatch(createErrorAction(status, 'Не удалось удалит чат'));
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
                ErrorComponent.componentWillUnmount();
                if (updateGroupState.id) {
                    router.route(`/${updateGroupState.id}`);
                }
                dispatch(createOpenChatAction(jsonBody));
                break;
            default:
                dispatch(createErrorAction(status, body));
                ErrorComponent.componentDidMount();
        }
    }
}