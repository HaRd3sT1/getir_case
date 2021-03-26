import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers/Index';
import { logsData} from './actions/logs';
import { verifyAuth} from './actions/auth';
import { clearUsers} from './actions/users';
// import { messagesListReset} from './actions/messagesList';
// import { messagesReset} from './actions/messages';
// import { clearDashboard} from './actions/dashboard';
import { generalData, siteData, infoData, totalLength, prizeData, Packets, defaultColorsSet } from './actions/general';

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
  // console.log(middlewares)
  // store.removeItem('persist:root')
  setTimeout(() => {
    store.dispatch(clearUsers());
    // store.dispatch(messagesReset());
    // store.dispatch(messagesListReset());
  }, 1);
  store.dispatch(logsData());
  store.dispatch(verifyAuth());
  store.dispatch(generalData());
  store.dispatch(siteData());
  store.dispatch(infoData());
  store.dispatch(prizeData());
  store.dispatch(totalLength());
  store.dispatch(Packets());
  // store.dispatch(Faq());
  // store.dispatch(giftsData());
  // store.dispatch(clearDashboard());
  defaultColorsSet();
  // store.dispatch(messageReset());
  // store.dispatch(logout());
  const persistor = persistStore(store);

  return { store, persistor };
};
