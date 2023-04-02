import { constantsOfActions } from "@/config/actions";

export const reduceGetContacts = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.getContacts:
            return {
                ...state,
                contacts: {
                    ...action
                },
            };
        default:
            return {
                ...state,
            }
    }
};
