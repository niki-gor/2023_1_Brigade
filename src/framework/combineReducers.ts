export const combineReducers = (
    reducers: {
        type: string;
        reducer: Reducer;
    }[]
) => {
    const reducersMap = new Map<string, Reducer>();
    for (const { type, reducer } of reducers) {
        reducersMap.set(type, reducer);
    }

    return reducersMap;
};
