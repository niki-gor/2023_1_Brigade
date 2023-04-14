import { constantsOfActions } from "@/config/actions";

export const reduceError = (state: anyObject, action: Action) => {
    console.log('error action payload: ', action.payload);
    switch (action.type) {
    case constantsOfActions.error:
        return {
            ...state,
            error: {
                ...action.payload
            },
        };
    default:
        return {
            ...state,
        }
    }
};