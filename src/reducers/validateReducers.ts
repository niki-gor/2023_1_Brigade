import { constantsOfActions } from '@config/actions';

export const reduceValidate = (
    state: Record<string, unknown>,
    action: Action
) => {
    switch (action.type) {
        case constantsOfActions.invalidEmail:
        case constantsOfActions.occupiedEmail:
        case constantsOfActions.occupiedUsername:
        case constantsOfActions.incorrectPassword:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return {
                ...state,
            };
    }
};
