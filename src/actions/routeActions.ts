import { constantsOfActions } from "@/config/actions";
import { Chats } from "@/containers/chatList/createChatList";
import { Contacts } from "@/containers/contacts/createContacts";
import { router } from "@/router/router";

export const createMoveToSignUpAction = () : Action => {
    router.route('/signup');

    return {
        type: constantsOfActions.moveToSignUp,
        payload: null,
    }
};

export const createMoveToLoginAction = () : Action => {
    router.route('/login');

    return {
        type: constantsOfActions.moveToLogin,
        payload: null,
    }
};

export const createRenderAction = () : Action => {
    return {
        type: constantsOfActions.render,
        payload: null,
    }
}

export const createMoveToProfileAction = () : Action => {
    router.route('/profile');

    return {
        type: constantsOfActions.moveToProfile,
        payload: null,
    }
};

export const createMoveToContactsAction = () : Action => {
    Chats.componentWillUnmount();
    Contacts.componentDidMount();

    return {
        type: constantsOfActions.moveToContacts,
        payload: null,
    }
};

export const createMoveToChatsAction = () : Action => {
    Contacts.componentWillUnmount();
    Chats.componentDidMount();

    return {
        type: constantsOfActions.moveToChats,
        payload: null,
    }
};

export const createMoveToCreateGroupAction = () : Action => {
    router.route('/create_group');

    return {
        type: constantsOfActions.moveToCreateGroup,
        payload: null,
    }
};
