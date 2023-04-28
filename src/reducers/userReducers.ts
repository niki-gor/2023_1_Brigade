import { constantsOfActions } from "@/config/actions";

/**
 * Обрабатывает экшен на установку данных о пользователе в State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после установки данных о пользователе
 */
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

/**
 * Обрабатывает экшен на удаление данных из State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после удаления данных из State
 */
export const reduceDeleteState = (state: anyObject, action: Action) => {
    switch (action.type) {
    case constantsOfActions.deleteState:
        return {};
    default:
        return {
            ...state,
        }
    }
};
