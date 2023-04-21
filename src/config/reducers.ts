import { reduceSetUser, reduceDeleteState } from '@reducers/userReducers';
import { constantsOfActions } from './actions';
import { reduceValidate } from '@reducers/validateReducers';
import { reduceSetContacts } from '@reducers/contactReducers';
import {
    reduceAddChat,
    reduceDeleteChat,
    reduceEditChat,
    reduceIsNotRendered,
    reduceOpenChat,
    reduceSetChats,
} from '@reducers/chatReducers';

/**
 * Устанавливает соответствие между экшенами и редьюсерами
 */
export const reducers = [
    { type: constantsOfActions.setUser, reducer: reduceSetUser },
    { type: constantsOfActions.deleteState, reducer: reduceDeleteState },
    { type: constantsOfActions.invalidEmail, reducer: reduceValidate },
    { type: constantsOfActions.occupiedEmail, reducer: reduceValidate },
    { type: constantsOfActions.occupiedUsername, reducer: reduceValidate },
    { type: constantsOfActions.setContacts, reducer: reduceSetContacts },
    { type: constantsOfActions.addChat, reducer: reduceAddChat },
    { type: constantsOfActions.openChat, reducer: reduceOpenChat },
    { type: constantsOfActions.setChats, reducer: reduceSetChats },
    { type: constantsOfActions.deleteChat, reducer: reduceDeleteChat },
    { type: constantsOfActions.editChat, reducer: reduceEditChat },
    { type: constantsOfActions.isNotRendered, reducer: reduceIsNotRendered },
];
