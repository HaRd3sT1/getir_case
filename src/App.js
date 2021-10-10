import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// import ReduxToastr from 'react-redux-toastr';

import LanguageWrapper from './Language';
// import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { configureStore } from './state/store';
import './index.scss';
import Router from './Router/Index';

const { store, persistor } = configureStore({});

const app = () => {
  return (
  <Provider store={store}>
    <LanguageWrapper>
      <PersistGate persistor={persistor}>
        {/* <ReduxToastr
          newestOnTop={false}
          preventDuplicates
          position="bottom-right"
          getState={state => state.toastr}
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        /> */}
        <Router />
      </PersistGate>
    </LanguageWrapper>
  </Provider>
  );
};

export default app
