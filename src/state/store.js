import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers/Index';
import {defaultColorsSet} from './actions/dashboard';

export const configureStore = initialState => {
  const middlewares = [];

  const composeEnhancers =
    (process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null) || compose;

  middlewares.push(applyMiddleware(thunk));

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...middlewares)
  );
  defaultColorsSet();
  const persistor = persistStore(store);

  return { store, persistor };
};
