import initReducer from './reducers/initReducer.js';
import { reduceAuth, reduceLogin, reduceSignUp } from './reducers/userReducers.js';

const reducers = {
    initReducer,
    reduceAuth,
    reduceLogin,
    reduceSignUp,
};

const combineReducers = (reducersMap) => (state, action) => {
    const nextState = {};

    Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state ? state[key] : state, action);
    });

    return nextState;
};

export default combineReducers(reducers);
