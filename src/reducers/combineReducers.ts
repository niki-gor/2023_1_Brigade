export const combineReducers = (
    reducers: {
        type: string;
        reducer: (
            state: Record<string, unknown>,
            action: Action
        ) => Record<string, unknown>;
    }[]
) => {
    const reducersMap = new Map<
        string,
        (
            state: Record<string, unknown>,
            action: Action
        ) => Record<string, unknown>
    >();
    for (const { type, reducer } of reducers) {
        reducersMap.set(type, reducer);
    }

    return reducersMap;
};
