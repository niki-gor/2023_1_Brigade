import { constantsOfActions } from "@/config/actions";

/**
 * Обработывает экшен на установку контактов в State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после установки контактов 
 */
export const reduceSetContacts = (state: anyObject, action: Action) => {
    switch (action.type) {
        case constantsOfActions.setContacts:
            if (!action.payload) {
                return {
                    ...state,
                    contacts: [],
                }
            }
            return {
                ...state,
                contacts: { ...action.payload },
            };
        default:
            return {
                ...state,
            }
    }
};
