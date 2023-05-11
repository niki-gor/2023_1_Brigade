import { constantsOfActions } from '@config/actions';

<<<<<<< HEAD
/**
 * Обработывает экшен на установку контактов в State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после установки контактов 
 */
export const reduceSetContacts = (state: anyObject, action: Action) => {
=======
export const reduceSetContacts = (state: State, action: Action) => {
>>>>>>> eslint
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
