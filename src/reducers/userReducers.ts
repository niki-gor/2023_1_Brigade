import { constantsOfActions } from '@config/actions';

export const reduceSetUser = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setUser:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload as User,
                };
            }
        default:
            return {
                ...state,
            };
    }
};

export const reduceDeleteState = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.deleteState:
            return {};
        default:
            return {
                ...state,
            };
    }
};
