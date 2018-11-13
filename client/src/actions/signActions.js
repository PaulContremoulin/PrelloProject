// Modules

/** Action types
* Action types are constants string meant to explains reducer which treatments are needed.
*/
export const SET_LOGIN = "SET_LOGIN" ;
export const LOG_OUT = "LOG_OUT" ;
export const EDIT_INFORMATION_USER = "EDIT_INFORMATION_USER";

/** Action Builders
* Action Builders are function that return an action following this rule of thumb :
* Whenever an given Action is dispatched on the Redux store with a given state,
* the resulting state is always the same produced.
* This mean also that random values are created by the Action Builder
*/

/**
* @desc set the user login
* @param login
* @return SET_LOGIN action
*/
export const setLogin = ( user ) => ({
  type: SET_LOGIN,
  user: user,
})

/**
* @desc unset the user login
* @return LOG_OUT action
*/
export const logOut = () => ({
  type: LOG_OUT,
})

export const changeInformationAction = (userEdit) => ({
    type: EDIT_INFORMATION_USER,
    userEdit
})
