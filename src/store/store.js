import createInitAction from './actions/initAction.js';
import config from '../modules/requests/config.js';
import reducer from './combineReducers.js';

const createStore = (reducer) => {
    let state = reducer(undefined, createInitAction());
    const subscribers = {};

    return {
        getState: () => state,
        dispatch: (action) => {
            state = reducer(state, action);
            console.log(state);
            Object.entries(subscribers).forEach(([, cb]) => {
                cb(config, state.user ?? 0);
            });
        },
        subscribe: (cb) => { subscribers[cb.toString()] = cb; },
        unsubscribe: (cb) => { delete subscribers[cb.toString()]; },
    };
};

const applyMiddleware = (middleware) => (createStoreFunc) => (reducer) => {
    const store = createStoreFunc(reducer);
    return {
        getState: store.getState,
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        subscribe: store.subscribe,
        unsubscribe: store.unsubscribe,
    };
};

const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return dispatch(action);
};

export default applyMiddleware(thunk)(createStore)(reducer);
