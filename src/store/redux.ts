export const createStore = (reducers: Map<string, (state: anyObject, action: Action) => anyObject>) => {
    let state: anyObject = {};
    let subscribers = new Map<string, Function>();

    return {
        getState: () => state,
        dispatch: (action: Action) => {
            const reducer = reducers.get(action.type);
            if (reducer) {
                state = reducer(state, action);
            }
            subscribers.forEach((cb) => cb());
        },
        subscribe: (cb: () => void) => { 
            subscribers.set(cb.name, cb); 
            return () => {
                subscribers.delete(cb.name);
            }
        },
    };
};

export const applyMiddleware = (middleware: Middleware) => (createStoreFunc: CreateStore) => (reducers: Map<string, (state: anyObject, action: Action) => anyObject>) => {
    const store = createStoreFunc(reducers);
    return {
        getState: store.getState,
        dispatch: (action: Action) => middleware(store)(store.dispatch)(action),
        subscribe: store.subscribe,
    };
};

export const thunk = (store: Store) => (dispatch: Dispatch) => (action: Action | ((dispatch: (action: Action) => void, state: anyObject) => Promise<void>)) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }

    return dispatch(action);
};
