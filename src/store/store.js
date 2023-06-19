import thunkMiddlewere from "redux-thunk"
import {
    applyMiddleware,
    compose,
    createStore } from "redux";
import { combinedReducer } from "./reducers";

const reducers = (state, action) => {
	return combinedReducer(state, action)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddlewere)
))

window.store = store