import {constantsOfActions} from "@config/actions";
import {createChat, getContacts} from "@utils/api";

/**
 * Создает экшен setContacts
 * @param {object} state - Объект, содержащий данные о контактах
 * @returns {Action} - Экшен
 */
export const createSetContactsAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setContacts,
        payload: state,
    }
}

/**
 * Создает асинхронный экшен для получения контактов
 * @returns {AsyncAction} - Асинхронная функция, которая вызывает экшен для установки контактов или отображает ошибку
 */
export const createGetContactsAction = () : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await getContacts();
        let jsonBody = await body;

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
}
