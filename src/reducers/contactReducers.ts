import { constantsOfActions } from '@config/actions';

export const reduceSetContacts = (state: State, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setContacts:
            if (action.payload) {
                return {
                    ...state,
                    contacts: action.payload as User[],
                };
            }
        default:
            return {
                ...state,
            };
    }
};
