import { combineReducers } from 'redux';
import { bankInfoReducer } from './bank-info.reducer';

export const combinedReducer = combineReducers({
	bankInfo: bankInfoReducer
});
