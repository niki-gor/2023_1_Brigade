import { constantsOfActions } from '@config/actions';
import { updateUser, uploadAvatar } from '@utils/api';

export const createSetUserAction = (state: User) => {
    return {
        type: constantsOfActions.setUser,
        payload: state,
    };
};

export const createInvalidEmailAction = (state: boolean) => {
    return {
        type: constantsOfActions.invalidEmail,
        payload: {
            invalidEmail: state,
        },
    };
};

export const createOccupiedEmailAction = (state: boolean) => {
    return {
        type: constantsOfActions.occupiedEmail,
        payload: {
            occupiedEmail: state,
        },
    };
};

export const createOccupiedUsernameAction = (state: boolean) => {
    return {
        type: constantsOfActions.occupiedUsername,
        payload: {
            occupiedUsername: state,
        },
    };
};

export const createIncorrectPasswordAction = (state: boolean) => {
    return {
        type: constantsOfActions.incorrectPassword,
        payload: {
            incorrectPassword: state,
        },
    };
};

export const createUpdateUserAction = (
    user: Record<string, unknown>
): AsyncAction => {
    return async (dispatch: Dispatch) => {
        const { status, body } = await updateUser(user);
        const jsonBody = await body;

        switch (status) {
            case 200:
                dispatch(createSetUserAction(jsonBody));
                break;
            case 400:
            // TODO:
            case 401:
            // TODO:
            case 404:
                dispatch(createIncorrectPasswordAction(true));
            case 409:
                dispatch(createOccupiedUsernameAction(true));
                break;
            case 500:
            // TODO:
            case 0:
            // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
            default:
            // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        }
    };
};

export const createUpdateUserAvatarAction = (
    avatar: File | undefined
): AsyncAction => {
    return async (dispatch: Dispatch) => {
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
};

export const createDeleteStateAction = () => {
    return {
        type: constantsOfActions.deleteState,
        payload: null,
    };
};
