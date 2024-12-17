import {combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import OuthSlice from './OuthSlice'
import PostSlice from './PostSlice';
import SocketioSlice from './SocketSlice'
const persistConfig = {
    key: 'root', // Key for storage
    storage, // Use localStorage for persistence
  };
  const rootreducer= combineReducers({
    Outh:OuthSlice,
    Post:PostSlice,
    Socketio:SocketioSlice
  })
  const persistedReducer = persistReducer(persistConfig, rootreducer);

const Store= configureStore({
    reducer: persistedReducer,
    
})
const persistor = persistStore(Store);

export  {Store,persistor};