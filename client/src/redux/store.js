import { createStore, applyMiddleware } from 'redux';
import { socket, socketMiddleware } from './middleware/websocket';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from "./reducers/index";


const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, applyMiddleware(socketMiddleware(socket)));
export const persistor = persistStore(store);

socket.on('data:store', function(action) {
   store.dispatch(action)
});
