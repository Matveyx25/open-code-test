import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { combinedReducer } from './reducers';
import actionToPlainObjectConverter from 'redux-action-class';
import { rootEpics } from './epics';

const reducer = (state, action) => {
    return combinedReducer(state, action);
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const initStore = () => {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(reducer, bindMiddleware([
    epicMiddleware,
    actionToPlainObjectConverter,
  ]));

  epicMiddleware.run(rootEpics);

  return store;
};
