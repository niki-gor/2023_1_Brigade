import { constantsOfActions } from "@/config/actions";
import { Chats } from "@/containers/chatList/createChatList";
import { Contacts } from "@/containers/contacts/createContacts";
import { router } from "@router/createRouter";

/**
 * Создает экшен для перехода на страницу регистрации
 * @returns {Action} - Экшен
 */
export const createMoveToSignUpAction = () : Action => {
    router.route('/signup');

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    }
};

/**
 * Создает экшен для перехода на страницу авторизации
 * @returns {Action} - Экшен
 */
export const createMoveToLoginAction = () : Action => {
    router.route('/login');

    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    }
};

/**
 * Создает экшен для рендеринга компонента
 * @returns {Action} - Экшен
 */
export const createRenderAction = () : Action => {
    return {
        type: constantsOfActions.render,
        payload: null,
    }
}

/**
 * Создает экшен для перехода на страницу профиля
 * @returns {Action} - Экшен
 */
export const createMoveToProfileAction = () : Action => {
    router.route('/profile');

    return {
        type: constantsOfActions.moveToProfile,
        payload: null,
    }
};

/**
 * Создает экшен для перехода на страницу контактов
 * @returns {Action} - Экшен
 */
export const createMoveToContactsAction = () : Action => {
    Chats.componentWillUnmount();
    Contacts.componentDidMount();

    return {
        type: constantsOfActions.moveToContacts,
        payload: null,
    }
};

/**
 * Создает экшен для перехода на страницу чатов
 * @returns {Action} - Экшен
 */
export const createMoveToChatsAction = () : Action => {
    Contacts.componentWillUnmount();
    Chats.componentDidMount();

    return {
        type: constantsOfActions.moveToChats,
        payload: null,
    }
};

/**
 * Создает экшен для перехода на страницу создания группы чата
 * @returns {Action} - Экшен
 */
export const createMoveToCreateGroupAction = () : Action => {
    router.route('/create_group');

    return {
        type: constantsOfActions.moveToCreateGroup,
        payload: null,
    }
};

/**
 * Создает экшен для перехода на страницу определенного чата
 * @param {object} chat - Объект, содержащий id чата
 * @returns {Action} - Экшен
 */
export const createMoveToChatAction = (chat: anyObject) : Action => {
    router.route(`/${chat.chatId}`);

    return {
        type: constantsOfActions.moveToChat,
        payload: null,
    }
}

/**
 * Создает экшен для перехода на страницу редактирования группы чата
 * @param {object} chat - Объект, содержащий id чата
 * @returns {Action} - Экшен
 */export const createMoveToEditChatAction = (chat: anyObject) : Action => {
    router.route(`/${chat.id}/add`);

    return {
        type: constantsOfActions.moveToEditChat,
        payload: chat.id,
    }
}
