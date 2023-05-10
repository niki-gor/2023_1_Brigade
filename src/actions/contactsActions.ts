import { constantsOfActions } from '@config/actions';
import { createChat, getContacts, getContactsByString } from '@utils/api';

export const createSetContactsAction = (state: User[]) => {
    return {
        type: constantsOfActions.setContacts,
        payload: state,
    };
};

export const createFindContactsByString = (string: string): AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getContactsByString(string);
        const jsonBody = await body;
        switch (status) {
            case 200:
            // return dispatch(createSetContactsAction(jsonBody));
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

export const createGetContactsAction = (): AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getContacts();
        const jsonBody = await body;

        switch (status) {
            case 200:
                return dispatch(createSetContactsAction(jsonBody));
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
