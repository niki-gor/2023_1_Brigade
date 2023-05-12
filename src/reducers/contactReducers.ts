import { constantsOfActions } from '@config/actions';

/**
 * Обработывает экшен на установку контактов в State
 *
 * @param {State} state - Текущее состояние
 * @param {Action} action - Экшен
 * @return {object} Обновленное состояние после установки контактов 
 */
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
