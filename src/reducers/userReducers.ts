import { constantsOfActions } from '@config/actions';

export const reduceSetUser = (
    state: Record<string, unknown>,
    action: Action
) => {
    switch (action.type) {
        case constantsOfActions.setUser:
            return {
                ...state,
                user: {
                    ...action.payload,
                },
            };
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteState = (
    state: Record<string, unknown>,
    action: Action
) => {
    switch (action.type) {
        case constantsOfActions.deleteState:
            return {};
        default:
            return {
                ...state,
            };
    }
};
