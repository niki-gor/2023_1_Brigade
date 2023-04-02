import { reduceSetUser } from "@/reducers/userReducers";
import { reduceGetContacts } from "@/reducers/contactReducers";
import {  } from "@/reducers/userReducers";
import { constantsOfActions } from "./actions";

/**
* Устанавливает соответствие между экшенами и редьюсерами
*/
export const reducers = [
    { type: constantsOfActions.setUser, reducer: reduceSetUser },
    { type: constantsOfActions.getContacts, reducer:  reduceGetContacts}
];
