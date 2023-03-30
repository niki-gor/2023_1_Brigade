import { reduceSetState } from "@/reducers/userReducers";

/**
* Устанавливает соответствие между экшенами и редьюсерами
*/
export const reducers = [
    { type: 'set', reducer: reduceSetState }
];
