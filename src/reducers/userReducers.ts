import { constantsOfActions } from "@/config/actions";

export const reduceSetState = (state: anyObject, action: Action) => {
    switch (action.type) {
    case constantsOfActions.setState:
        return {
            ...action.payload,
        };
    default:
        return {
            ...state,
        }
    }
};
