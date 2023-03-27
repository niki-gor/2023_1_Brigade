import { createStore, applyMiddleware, thunk } from '@store/redux';
import { combineReducers } from '@reducers/combineReducers';
import { reduceInit } from '@reducers/initReducer';
import { reduceAuth, reduceLogin, reduceSignUp } from '@reducers/userReducers';

const reducers = combineReducers({
    reduceInit,
    reduceAuth,
    reduceLogin,
    reduceSignUp,
});

export const store = applyMiddleware(thunk)(createStore)(reducers);
