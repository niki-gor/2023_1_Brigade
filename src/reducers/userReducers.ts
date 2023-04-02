import { constantsOfActions } from "@/config/actions";

export const reduceSetUser = (state: anyObject, action: Action) => {
    switch (action.type) {
    case constantsOfActions.setUser:
        return {
            ...state,
            user: {
                ...action.payload
            },
        };
    default:
        return {
            ...state,
        }
    }
};
