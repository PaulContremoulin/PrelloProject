import { createStore, applyMiddleware } from 'redux';
import { socket, socketMiddleware } from './middleware/websocket';
import rootReducer from "./reducers/index";

export const store = createStore(rootReducer, applyMiddleware(socketMiddleware(socket)));

socket.on('data:store', function(action) {
   store.dispatch(action)
});
