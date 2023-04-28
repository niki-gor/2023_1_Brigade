import { constantsOfActions } from "@/config/actions";

/**
 * Обновляет состояние объекта при получении соответствующих действий.
 * @param {Object} state - Текущее состояние объекта.
 * @param {Object} action - Объект, содержащий данные действия.
 * @returns {Object} - Новое состояние объекта.
 */
export const reduceValidate = (state: anyObject, action: Action) => {
    switch (action.type) {
    case constantsOfActions.invalidEmail:
    case constantsOfActions.occupiedEmail:
    case constantsOfActions.occupiedUsername:
    case constantsOfActions.incorrectPassword:
        return {
            ...state,
            ...action.payload,
        };
    default:
        return {
            ...state,
        }
    }
};
