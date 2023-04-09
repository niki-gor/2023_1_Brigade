import { constantsOfActions } from "@/config/actions";

export const reduceError = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.openError:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return {
                ...state,
            }
    }
};