import createInitAction from './actions/createInitAction.js';

const createStore = (reducer) => {
    let state = reducer(undefined, createInitAction());
    const subscribers = {};

    return {
        getState: () => state,
        dispatch: (action) => {
            state = reducer(state, action);
            subscribers.forEach((cb) => cb());
        },
        subscribe: (cb) => { subscribers[cb.name] = cb; },
        unsubscribe: (cb) => { delete subscribers[cb.name]; },
    };
};

const applyMiddleware = (middleware) => (createStoreFunc) => (reducer) => {
    const store = createStoreFunc(reducer);
    return {
        dispatch: (action) => middleware(store)(store.dispatch)(action),
        getState: store.getState,
    };
};

const thunk = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return dispatch(action);
};

export default applyMiddleware(thunk)(createStore);
