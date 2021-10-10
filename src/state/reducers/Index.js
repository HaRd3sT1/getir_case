import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { preferencesReducer } from './preferences';
import dashboard from './dashboard';
import basket from './basket';
import form from './form';
import product from './product';

export default combineReducers({
  dashboard: persistReducer(
    { key: 'dashboard', storage },
    dashboard
  ),
  basket: persistReducer(
    { key: 'basket', storage },
    basket
  ),
  form: persistReducer(
    { key: 'form', storage },
    form
  ),
  product: persistReducer(
    { key: 'product', storage },
    product
  ),
  preferences: persistReducer(
    { key: 'preferences', storage },
    preferencesReducer
  ),
});
