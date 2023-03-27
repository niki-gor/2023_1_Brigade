export const combineReducers = (reducersMap) => (state, action) => {
    const nextState = {};

    Object.entries(reducersMap).forEach(([key, reducer]) => {
        nextState[key] = reducer(state ? state[key] : state, action);
    });

    return nextState;
};
