import { constantsOfActions } from "@/config/actions"
import { updateUser, uploadAvatar} from "@/utils/api"

/** 
 * Создает экшен для установки состояния пользователя.
 * @param {anyObject} state - Состояние пользователя.
 * @returns {Action} экшен с типом "setUser" и полезной нагрузкой "state".
 **/
export const createSetUserAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setUser,
        payload: state,
    }
}

/** 
 * Создает экшен для неверной электронной почты.
 * @returns {Action} экшен с типом "invalidEmail".
 **/
export const createInvalidEmailAction = () : Action => {
    return {
        type: constantsOfActions.invalidEmail,
        payload: {
            invalidEmail: true,
        },
    }
}

/** 
 * Создает экшен для занятой электронной почты.
 * @returns {Action} экшен с типом "occupiedEmail".
 **/
export const createOccupiedEmailAction = () : Action => {
    return {
        type: constantsOfActions.occupiedEmail,
        payload: {
            occupiedEmail: true,
        },
    }
}

/** 
 * Создает экшен для занятого имени пользователя.
 * @returns {Action} экшен с типом "occupiedUsername".
 **/
export const createOccupiedUsernameAction = () : Action => {
    return {
        type: constantsOfActions.occupiedUsername,
        payload: {
            occupiedUsername: true,
        },
    }
}

/** 
 * Создает экшен для неправильного пароля.
 * @returns {Action} экшен с типом "incorrectPassword".
 **/
export const createIncorrectPasswordAction = () : Action => {
    return {
        type: constantsOfActions.incorrectPassword,
        payload: {
            incorrectPassword: true,
        },
    }
}

/** 
 * Создает асинхронное действие для обновления состояния пользователя.
 * @param {anyObject} user - Объект пользователя для обновления.
 * @returns {AsyncAction} Асинхронное действие, которое вызывает "createSetUserAction" или другие действия с ошибками.
 **/
export const createUpdateUserAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await updateUser(user);
        const jsonBody = await body;
        console.log(jsonBody);
        switch (status) {
        case 200:
            dispatch(createSetUserAction(jsonBody));
            break;
        case 400:
            // TODO:
        case 401:
            // TODO:
        case 404:
            dispatch(createIncorrectPasswordAction());
        case 409:
            dispatch(createOccupiedUsernameAction());
            break;
        case 500:
            // TODO:
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    }
}

/** 
 * Создает асинхронный экшен для обновления аватара пользователя.
 * @param {File | undefined} avatar - Новый файл аватара для загрузки.
 * @returns {AsyncAction} Асихронный экшен, который либо вызывает "createSetUserAction", либо другие действия с ошибками.
 **/
export const createUpdateUserAvatarAction = (avatar: File | undefined) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        if (!avatar) {
            return;
        }

        const { status, body } = await uploadAvatar(avatar);
        const jsonBody = await body;
        
        switch (status) {
            case 201:
                dispatch(createSetUserAction(jsonBody));
                break;
            case 401:
            // TODO:
            case 404:
            // TODO:
            case 500:
            // TODO:
            case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
            default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
}

/** 
 * Создает экшен для удаления состояния пользователя.
 * @returns {Action} экшен с типом "deleteState" и пустой нагрузкой.
 **/
export const createDeleteStateAction = () => {
    return {
        type: constantsOfActions.deleteState,
        payload: null,
    }
}
