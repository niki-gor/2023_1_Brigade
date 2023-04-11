import { auth, login, signUp, logout } from "@/utils/api";
import { createSetUserAction, createInvalidEmailAction, createOccupiedEmailAction, createDeleteStateAction } from "@actions/userActions";
import { router } from "@/router/router";
import { Contacts } from "@/containers/contacts/createContacts";
import { Chats } from "@/containers/chatList/createChatList";
import { Sidebar } from "@/containers/sidebar/createSidebar";
import { getWs } from "@/utils/ws";

export const createAuthAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await auth();
        
        switch (status) {
        case 200:
            const jsonBody = await body;
            dispatch(createSetUserAction(jsonBody));

            getWs();
            
            Sidebar.componentDidMount();
            Chats.componentDidMount();

            router.route(window.location.pathname);

            break;
        case 401:
            if (window.location.pathname == '/signup') {
                router.route('/signup');
            } else {
                router.route('/login');
            }
            break;
        case 500:
            // TODO: отрендерить ошибку
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createLoginAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await login(user);

        switch (status) {
        case 200:
            const jsonBody = await body;
            dispatch(createSetUserAction(jsonBody));

            getWs();

            Sidebar.componentDidMount();
            Chats.componentDidMount();

            router.route('/');

            break;
        case 404:
            dispatch(createInvalidEmailAction());
            break;
        case 409:
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

export const createSignUpAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await signUp(user);

        switch (status) {
        case 201:
            const jsonBody = await body;
            dispatch(createSetUserAction(jsonBody));

            getWs();
            
            Sidebar.componentDidMount();
            Chats.componentDidMount();

            router.route('/');

            break;
        case 400:
            // TODO: отрендерить ошибку
        case 409:
            dispatch(createOccupiedEmailAction());
            break;
        case 500:
            // TODO: отрендерить ошибку
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createLogoutAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await logout();

        switch (status) {
        case 204:
            Sidebar.componentWillUnmount();
            Contacts.componentWillUnmount();
            Chats.componentWillUnmount();

            const ws = getWs();
            ws.close();

            router.route('/login');

            dispatch(createDeleteStateAction());

            break;
        case 401:
            // TODO: вроде на все нужно login отрендерить
        case 404:
            // TODO: вроде на все нужно login отрендерить
        case 500:
            // TODO: отрендерить ошибку
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};
