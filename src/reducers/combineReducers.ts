/**
 * Объединяет редьюсеры в единый объект
 *
 * @param {object} reducers - Объект, содержащий в себе тип экшена и функцию редьюсера для этого типа
 * @return {object} Объект, содержащий в себе все переданные функции редьюсеров
 */
export const combineReducers = (reducers: { type: string, reducer: (state: anyObject, action: Action) => anyObject }[]) => {
    let reducersMap = new Map<string, (state: anyObject, action: Action) => anyObject>();
    for (const { type, reducer } of reducers) {
        reducersMap.set(type, reducer);
    }

    return reducersMap;
};
