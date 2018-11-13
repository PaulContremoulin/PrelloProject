// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const SET_LABELS = 'SET_LABELS';
 export const ADD_LABEL = 'ADD_LABEL';
 export const SET_NAME_LABEL = 'SET_NAME_LABEL';
 export const SET_COLOR_LABEL = 'SET_COLOR_LABEL';
 export const DELETE_LABEL = 'DELETE_LABEL';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


 /**
 * @desc
 */
 export const setLabels = (labels) => {
   return {
       type: SET_LABELS,
       labels,
   }
 };

 /**
 * @desc
 */
 export const addLabel = (label, idBoard) => {
   return {
       type: ADD_LABEL,
       label,
       meta: {
           socket: {
               channel: 'data:store',
               room: idBoard,
           }
       }
   }
 };

/**
* @desc
*/
export const setNameLabel = (idLabel, nameLabel, idBoard) => {
  return {
      type: SET_NAME_LABEL,
      label: {
        id: idLabel,
        name: nameLabel,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
  }
};

/**
* @desc
*/
export const setColorLabel = (idLabel, colorLabel, idBoard) => {
  return {
      type: SET_COLOR_LABEL,
      label: {
        id: idLabel,
        color: colorLabel,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
  }
};

/**
* @desc
*/
export const deleteLabelFromBoard = (idLabel, idBoard) => {
  return {
      type: DELETE_LABEL,
      label: {
        id: idLabel,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
  }
};
