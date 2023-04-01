import { auth, login, signUp, logout } from "@/utils/api";
import { createSetUserAction, createInvalidEmailAction, createOccupiedEmailAction } from "@actions/userActions";
import { router } from "@/router/router";

export const createAuthAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await auth();
        
        switch (status) {
        case 200:
            dispatch(createSetUserAction(body));
            router.route('/profile');
            break;
        case 401:
            router.route('/login');
            break;
        case 500:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
            break;
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
            break;
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createLoginAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await login(user);

        switch (status) {
        case 200:
            return dispatch(createSetUserAction(body));
        case 404:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 409:
            return dispatch(createInvalidEmailAction());
        case 500:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createSignUpAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await signUp(user);

        switch (status) {
        case 201:
            return dispatch(createSetUserAction(body));
        case 400:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 409:
            return dispatch(createOccupiedEmailAction());
        case 500:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createLogoutAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await logout();

        switch (status) {
        case 204:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 401:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 404:
            return dispatch(createOccupiedEmailAction());
        case 500:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};
