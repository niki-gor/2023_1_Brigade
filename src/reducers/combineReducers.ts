export const combineReducers = (reducers: { type: string, reducer: (state: anyObject, action: Action) => anyObject }[]) => {
    let reducersMap = new Map<string, (state: anyObject, action: Action) => anyObject>();

    for (const { type, reducer } of reducers) {
        reducersMap.set(type, reducer);
    }

    return reducersMap;
};
