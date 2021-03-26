import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { reducer as toastrReducer } from 'react-redux-toastr';

import { authReducer } from './auth';
import { generalDataReducer } from './general';
import { preferencesReducer } from './preferences';
import { users } from './users';
import { formReducer } from './form';
import { viewsReducer } from './views';
import { dashboardReducer } from './dashboard';
import { messagesReducer } from './messages';
import { messagesUsers } from './messagesUsers';
import { messagesList } from './messagesList';
import { logsReducer } from './logs';
import { favsReducer } from './favs';
import { friendsReducer } from './friends';
import { paymentsReducer } from './payments';
import { search } from './search';
import { onlineUsers } from './onlineUsers';
import { lastUsers } from './lastUsers';

export default combineReducers({
  users: persistReducer(
    {
      key: 'users',
      storage,
      blacklist: ['error', 'loading'],
    },
    users
  ),
  generalDataReducer: persistReducer(
    {
      key: 'general',
      storage,
      blacklist: ['error', 'loading'],
    },
    generalDataReducer
  ),
  auth: persistReducer(
    {
      key: 'auth',
      storage,
      blacklist: ['error', 'loading'],
    },
    authReducer
  ),
  preferences: persistReducer(
    { key: 'preferences', storage },
    preferencesReducer
  ),
  form: persistReducer(
    { key: 'form', storage },
    formReducer
  ),
  dashboard: persistReducer(
    { key: 'dashboard', storage },
    dashboardReducer
  ),
  messages: persistReducer(
    { key: 'messages', storage },
    messagesReducer
  ),
  messagesUsers: persistReducer(
    { key: 'messagesUsers', storage },
    messagesUsers
  ),
  messagesList: persistReducer(
    { key: 'messagesList', storage },
    messagesList
  ),
  logs: persistReducer(
    { key: 'logs', storage },
    logsReducer
  ),
  favs: persistReducer(
    { key: 'favs', storage },
    favsReducer
  ),
  views: persistReducer(
    { key: 'views', storage },
    viewsReducer
  ),
  friends: persistReducer(
    { key: 'friends', storage },
    friendsReducer
  ),
  payments: persistReducer(
    { key: 'payments', storage },
    paymentsReducer
  ),
  search: persistReducer(
    { key: 'search', storage },
    search
  ),
  onlineUsers: persistReducer(
    { key: 'onlineUsers', storage },
    onlineUsers
  ),
  lastUsers: persistReducer(
    { key: 'lastUsers', storage },
    lastUsers
  ),
  toastr: toastrReducer,
});
