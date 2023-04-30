import { constantsOfActions } from '@config/actions';
import { Chats } from '@containers/chatList/createChatList';
import { Contacts } from '@containers/contacts/createContacts';
import { router } from '@router/createRouter';

export const createMoveToSignUpAction = () => {
    router.route('/signup');

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    };
};

export const createMoveToLoginAction = () => {
    router.route('/login');

    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    };
};

export const createRenderAction = () => {
    return {
        type: constantsOfActions.render,
        payload: null,
    };
};

export const createMoveToProfileAction = () => {
    router.route('/profile');

    return {
        type: constantsOfActions.moveToProfile,
        payload: null,
    };
};

export const createMoveToContactsAction = () => {
    Chats.componentWillUnmount();
    Contacts.componentDidMount();

    return {
        type: constantsOfActions.moveToContacts,
        payload: null,
    };
};

export const createMoveToChatsAction = () => {
    Contacts.componentWillUnmount();
    Chats.componentDidMount();

    return {
        type: constantsOfActions.moveToChats,
        payload: null,
    };
};

export const createMoveToCreateGroupAction = () => {
    router.route('/create_group');

    return {
        type: constantsOfActions.moveToCreateGroup,
        payload: null,
    };
};

export const createMoveToChatAction = (
    chat: Record<string, unknown>
): Action => {
    router.route(`/${chat.chatId}`);

    return {
        type: constantsOfActions.moveToChat,
        payload: null,
    };
};

// при нажатие на кнопку редактиования динамическая часть заменяется на компонент SmartAddUserInGroup
export const createMoveToEditChatAction = (chat: OpenedChat | undefined) => {
    if (chat) {
        router.route(`/${chat.id}/add`);
    }

    return {
        type: constantsOfActions.moveToEditChat,
        payload: null,
    };
};
