import {store} from "./redux/store";

export function isLogged() {
    const stateStore = store.getState();
    return stateStore.user.token || null;
}
