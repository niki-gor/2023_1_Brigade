import { constantsOfActions } from "@/config/actions"
import { auth, updateUser } from "@/utils/api"

export const createSetUserAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setUser,
        payload: state,
    }
}

export const createInvalidEmailAction = () : Action => {
    return {
        type: constantsOfActions.invalidEmail,
        payload: null,
    }
}

export const createOccupiedEmailAction = () : Action => {
    return {
        type: constantsOfActions.occupiedEmail,
        payload: null,
    }
}

export const createOccupiedUsernameAction = () : Action => {
    return {
        type: constantsOfActions.occupiedUsername,
        payload: null,
    }
}

export const createUpdateUserAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await updateUser(user);

        switch (status) {
        case 200:
            return dispatch(createSetUserAction(body));
        case 400:
            return dispatch(createOccupiedUsernameAction());
        case 401:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 404:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 409:
            return dispatch(createOccupiedUsernameAction());
        case 500:
            // TODO: не уверен, но как-будто нужно поменять url и роутер уже отреагирует и отрендерит
        case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
}
