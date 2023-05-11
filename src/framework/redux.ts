export const createStore = (reducers: Map<string, Reducer>): Store => {
    let state: State = {};
    const subscribers = new Map<string, Callback>();

    return {
        getState: () => state,
        dispatch: (action: Action) => {
            const reducer = reducers.get(action.type);
            if (reducer) {
                state = reducer(state, action);
            }
            subscribers.forEach((cb) => {
                cb(state);
            });
        },
        subscribe: (key: string, cb: (state: State) => void) => {
            subscribers.set(key, cb);
            return () => {
                subscribers.delete(key);
            };
        },
    };
};

export const applyMiddleware =
    (middleware: Middleware) =>
    (createStoreFunc: CreateStore) =>
    (reducers: Map<string, Reducer>) => {
        const store = createStoreFunc(reducers);
        return {
            getState: store.getState,
            dispatch: (action: Action | AsyncAction) =>
                middleware(store)(store.dispatch)(action),
            subscribe: store.subscribe,
        };
    };

export const thunk =
    (store: Store) =>
    (dispatch: Dispatch) =>
    (action: Action | AsyncAction) => {
        if (typeof action === 'function') {
            return action(dispatch, store.getState);
        }

        return dispatch(action);
    };
