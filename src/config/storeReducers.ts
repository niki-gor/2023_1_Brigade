import { reduceSetUser, reduceDeleteState } from "@/reducers/userReducers";
import { constantsOfActions } from "./actions";

/**
* Устанавливает соответствие между экшенами и редьюсерами
*/
export const reducers = [
    { type: constantsOfActions.setUser, reducer: reduceSetUser },
    { type: constantsOfActions.deleteState, reducer: reduceDeleteState },
];
