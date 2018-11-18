import {store} from "./redux/store";

/**
 * @desc check if the user is logged
 * @return if logged return a token, else null
 */
export function isLogged() {
    const stateStore = store.getState();
    return stateStore.user.token || null;
}
