import { constantsOfActions } from '@config/actions';

<<<<<<< HEAD
/**
 * Обрабатывает экшен на установку данных о пользователе в State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после установки данных о пользователе
 */
export const reduceSetUser = (state: anyObject, action: Action) => {
=======
export const reduceSetUser = (state: State, action: Action) => {
>>>>>>> eslint
    switch (action.type) {
        case constantsOfActions.setUser:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload as User,
                };
            }
        default:
            return {
                ...state,
            };
    }
};

<<<<<<< HEAD
/**
 * Обрабатывает экшен на удаление данных из State
 *
 * @param {object} state - Текущее состояние
 * @param {object} action - Экшен
 * @return {object} Обновленное состояние после удаления данных из State
 */
export const reduceDeleteState = (state: anyObject, action: Action) => {
=======
export const reduceDeleteState = (state: State, action: Action) => {
>>>>>>> eslint
    switch (action.type) {
        case constantsOfActions.deleteState:
            return {};
        default:
            return {
                ...state,
            };
    }
};
