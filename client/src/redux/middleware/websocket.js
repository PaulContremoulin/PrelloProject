import io from "socket.io-client";


export const socket = io.connect(process.env.REACT_APP_API_URL + '/');

export const socketMiddleware = function (socket) {
    return function () {
        return function (next) {
            return function (action) {
                if (action.meta && action.meta.socket && action.meta.socket.channel) {
                    let meta = JSON.parse(JSON.stringify(action.meta));
                    delete action.meta.socket
                    socket.emit(meta.socket.channel, action);
                }
                return next(action);
            };
        };
    };
};