import { reduceSetUser } from "@/reducers/userReducers";
import { constantsOfActions } from "./actions";

/**
* Устанавливает соответствие между экшенами и редьюсерами
*/
export const reducers = [
    { type: constantsOfActions.setUser, reducer: reduceSetUser }
];
