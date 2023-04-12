import { constantsOfActions } from "@/config/actions"
import { updateUser, uploadAvatar} from "@/utils/api"

export const createSetUserAction = (state: anyObject) : Action => {
    return {
        type: constantsOfActions.setUser,
        payload: state,
    }
}

export const createInvalidEmailAction = () : Action => {
    return {
        type: constantsOfActions.invalidEmail,
        payload: {
            invalidEmail: true,
        },
    }
}

export const createOccupiedEmailAction = () : Action => {
    return {
        type: constantsOfActions.occupiedEmail,
        payload: {
            occupiedEmail: true,
        },
    }
}

export const createOccupiedUsernameAction = () : Action => {
    return {
        type: constantsOfActions.occupiedUsername,
        payload: {
            occupiedUsername: true,
        },
    }
}

export const createUpdateUserInfoAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const { status, body } = await updateUser(user);
        const { jsonBody } = await body;
        
        switch (status) {
        case 200:
            dispatch(createSetUserAction(jsonBody));
            break;
        case 400:
            // TODO:
        case 401:
            // TODO:
        case 404:
            // TODO:
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

export const createUpdateUserAvatarAction = (avatar: File | undefined) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        const Avatar = await uploadAvatar(avatar);

        // switch (Avatar.status) {
        //     case 200:
        //         // dispatch(createSetUserAction(jsonBody));
        //         break;
        //     case 400:
        //     // TODO:
        //     case 401:
        //     // TODO:
        //     case 404:
        //     // TODO:
        //     case 409:
        //         // dispatch(createOccupiedUsernameAction());
        //         break;
        //     case 500:
        //     // TODO:
        //     case 0:
        //     // TODO: тут типа жееееееесткая ошибка случилось, аж catch сработал
        //     default:
        //     // TODO: мб отправлять какие-нибудь логи на бэк? ну и мб высветить страничку, мол вообще хз что, попробуй позже
        // }
    };
}

export const createDeleteStateAction = () => {
    return {
        type: constantsOfActions.deleteState,
        payload: null,
    }
}
