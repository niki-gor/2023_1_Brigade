import { createStore, applyMiddleware, thunk } from '@store/redux';
import { combineReducers } from '@reducers/combineReducers';
import { reducers } from '@/config/reducers';

const reducersMap = combineReducers(reducers);

export const store = applyMiddleware(thunk)(createStore)(reducersMap);
