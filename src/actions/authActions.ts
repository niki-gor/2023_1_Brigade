import { auth, login, signUp, logout } from "@/utils/api";
import { createSetUserAction, createInvalidEmailAction, createOccupiedEmailAction, createDeleteStateAction } from "@actions/userActions";
import { router } from "@/router/router";
import { Contacts } from "@/containers/contacts/createContacts";
import { Chats } from "@/containers/chatList/createChatList";
import { Sidebar } from "@/containers/sidebar/createSidebar";
import { getWs } from "@/utils/ws";
import { createErrorAction } from "./errorActions";
import { ErrorComponent } from "@/containers/error/createError";
import { SmartLogin } from "@/containers/login/login";
import { LOGIN } from "@/config/config";

export const createAuthAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await auth();
        const jsonBody = await body;
        
        switch (status) {
        case 200:
            ErrorComponent.componentWillUnmount();
            dispatch(createSetUserAction(jsonBody));

            getWs();
            
            Sidebar.componentDidMount();
            Chats.componentDidMount();

            router.route(window.location.pathname);

            break;
        case 401:
            ErrorComponent.componentWillUnmount();
            if (window.location.pathname == '/signup') {
                router.route('/signup');
            } else {
                router.route('/login');
            }
            break;
        default:
            dispatch(createErrorAction(status, jsonBody));
            ErrorComponent.componentDidMount();
        }
    };
};

export const createLoginAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await login(user);
        const jsonBody = await body;

        switch (status) {
        case 200:
            ErrorComponent.componentWillUnmount();
            dispatch(createSetUserAction(jsonBody));

            getWs();

            Sidebar.componentDidMount();
            Chats.componentDidMount();
            

            router.route('/');
            break;
        case 404:
            ErrorComponent.componentWillUnmount();
            // dispatch(createErrorAction(status, jsonBody));
            // ErrorComponent.componentDidMount(); // TODO: router.route('kalnsdln');
            dispatch(createInvalidEmailAction());
            break;
        default:
            dispatch(createErrorAction(status, jsonBody));
            ErrorComponent.componentDidMount();
        }
    };
};

export const createSignUpAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await signUp(user);
        const jsonBody = await body;

        switch (status) {
        case 201:
            ErrorComponent.componentWillUnmount();
            dispatch(createSetUserAction(jsonBody));

            getWs();

            Sidebar.componentDidMount();
            Chats.componentDidMount();

            router.route('/');
            break;
        case 400:
            dispatch(createErrorAction(status, jsonBody));
            ErrorComponent.componentDidMount();
        case 409:
            ErrorComponent.componentWillUnmount();
            dispatch(createOccupiedEmailAction());
            break;
        default:
            dispatch(createErrorAction(status, jsonBody));
            ErrorComponent.componentDidMount();
        }
    };
};

export const createLogoutAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await logout();

        switch (status) {
        case 204:
            ErrorComponent.componentWillUnmount();
            Sidebar.componentWillUnmount();
            Contacts.componentWillUnmount();
            Chats.componentWillUnmount();

            const ws = getWs();
            ws.close();

            router.route('/login');

            dispatch(createDeleteStateAction());

            break;
        default:
            dispatch(createErrorAction(status, body));
            ErrorComponent.componentDidMount();
        }
    };
};
