import { combineReducers } from 'redux';
import { bankInfoReducer } from './bank-info.reducer';
import { manualsReducer } from './manuals.reducer';
import { messagesReducer } from './messages.reducer';

export const combinedReducer = combineReducers({
	bankInfo: bankInfoReducer,
	manuals: manualsReducer,
	messages: messagesReducer
});
