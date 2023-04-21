export const combineReducers = (
    reducers: {
        type: string;
        reducer: (state: AnyObject, action: Action) => AnyObject;
    }[]
) => {
    const reducersMap = new Map<
        string,
        (state: AnyObject, action: Action) => AnyObject
    >();
    for (const { type, reducer } of reducers) {
        reducersMap.set(type, reducer);
    }

    return reducersMap;
};
