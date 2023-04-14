import { constantsOfActions } from "@/config/actions"
import { ErrorComponent } from "@/containers/error/createError"
import { updateUser, uploadAvatar} from "@/utils/api"
import { createErrorAction } from "./errorActions"

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

export const createUpdateUserAction = (user: anyObject) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: Function) => {
        const { status, body } = await updateUser(user);
        const { jsonBody } = await body;
        
        switch (status) {
        case 200:
            ErrorComponent.componentWillUnmount();
            dispatch(createSetUserAction(jsonBody));
            break;
        case 409:
            ErrorComponent.componentWillUnmount();
            dispatch(createOccupiedUsernameAction());
            break;
        default:
            dispatch(createErrorAction(status, jsonBody));
            ErrorComponent.componentDidMount();
        }
    }
}

export const createUpdateUserAvatarAction = (avatar: File | undefined) : AsyncAction => {
    return async (dispatch: (action: Action) => void, state: anyObject) => {
        if (!avatar) {
            return;
        }

        const { status, body } = await uploadAvatar(avatar);
        const { jsonBody } = await body;
        
        switch (status) {
            case 201:
                ErrorComponent.componentWillUnmount();
                dispatch(createSetUserAction(jsonBody));
                break;
            default:
                dispatch(createErrorAction(status, jsonBody));
                ErrorComponent.componentDidMount();
        }
    };
}

export const createDeleteStateAction = () => {
    return {
        type: constantsOfActions.deleteState,
        payload: null,
    }
}
