import {store} from "./redux/store";

export function isLogged() {
    const stateStore = store.getState();
    // console.log(stateStore);
    return stateStore.user.token || null;
}
