import { constantsOfActions } from "@config/actions";

export const reduceSetContacts = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setContacts:
            if (!action.payload) {
                return {
                    ...state,
                    contacts: [],
                };
            }
            return {
                ...state,
                contacts: { ...action.payload },
            };
        default:
            return {
                ...state,
            };
    }
};
