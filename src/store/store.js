import reducers from '../reducers/combineReducers.js';

const createStore = (reducer) => {
    let state = {};
    const subscribers = {};

    return {
        getState: () => state,
        dispatch: (action) => {
            state = reducer(state, action);
            Object.entries(subscribers).forEach(([, cb]) => cb());
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

export default applyMiddleware(thunk)(createStore)(reducers);
