// Modules

import {CARD_ADD_CHECKITEM} from "./cardActions";

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const RESET_CHECKLISTS = 'RESET_CHECKLISTS';
 export const CHECKLIST_SET_NAME = 'CHECKLIST_SET_NAME';
 export const CHECKLIST_SET_POS = 'CHECKLIST_SET_POS';
 export const CHECKITEM_SET_NAME = 'CHECKITEM_SET_NAME';
 export const CHECKITEM_SET_POS = 'CHECKITEM_SET_POS';
 export const CHECKITEM_SET_STATE = 'CHECKITEM_SET_STATE';
 export const DELETE_CHECKLIST = 'DELETE_CHECKLIST';
 export const DELETE_CHECKITEM = 'DELETE_CHECKITEM';
 export const ADD_CHECKITEM ='ADD_CHECKITEM';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


 /**
  * @desc Set the checklists reducer to the default value
  * @return RESET_CHECKLISTS action
  */
 export const resetChecklists = () => {
   return {
       type: RESET_CHECKLISTS,
   }
 };

 /**
  * @desc Change the name of a checklist
  * @param idChecklist, checklistName, idBoard
  * @return CHECKLIST_SET_NAME action
  */
export const checklistSetName = (idChecklist, checklistName, idBoard) => {
  return {
      type: CHECKLIST_SET_NAME,
      card: {
        checklist: {
          id: idChecklist,
          name: checklistName,
        },
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
 * @desc Change the position of a checklist
 * @param idChecklist, checklistPos, idBoard, idCard
 * @return CHECKLIST_SET_POS action
 */
export const checklistSetPos = (idChecklist, checklistPos, idBoard, idCard) => {
  return {
      type: CHECKLIST_SET_POS,
      card: {
        id: idCard,
        checklist: {
          id: idChecklist,
          pos: checklistPos,
        },
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
 * @desc Change the name of a checkitem
 * @param idCheckItem, checkItemName, idBoard, idCard, idChecklist
 * @return CHECKITEM_SET_NAME action
 */
export const checkItemSetName = (idCheckItem, checkItemName, idBoard, idCard, idChecklist) => {
  return {
      type: CHECKITEM_SET_NAME,
      card: {
        id: idCard,
        checklist: {
          id: idChecklist,
          checkItem: {
            id: idCheckItem,
            name: checkItemName,
          }
        },
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
 * @desc Delete a checklist from a card
 * @param idBoard, idCard, idChecklist
 * @return DELETE_CHECKLIST action
 */
export const checkListDelete = (idBoard, idCard, idChecklist) => {
    return {
        type: DELETE_CHECKLIST,
        card: {
            id: idCard,
            checklist: {
                id: idChecklist
            },
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
 * @desc Add a checkItem to a card
 * @param idBoard, idCard, idChecklist, checkItem
 * @return ADD_CHECKITEM action
 */
export const addCheckItem = (idBoard, idCard, idChecklist, checkItem) => {
    return {
        type: ADD_CHECKITEM,
        card: {
            id: idCard,
            checklist: {
                id: idChecklist,
                checkItem
            }
        },
        meta: {
            socket: {
                channel: 'data:store',
                room: idBoard,
            }
        }
    }
}

/**
 * @desc Change the position of a checkItem in a  checklist
 * @param idCheckItem, checkItemPos, idBoard, idCard, idChecklist
 * @return CHECKITEM_SET_POS action
 */
export const checkItemSetPos = (idCheckItem, checkItemPos, idBoard, idCard, idChecklist) => {
  return {
      type: CHECKITEM_SET_POS,
      card: {
        id: idCard,
        checklist: {
          id: idChecklist,
          checkItem: {
            id: idCheckItem,
            pos: checkItemPos,
          }
        },
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
 * @desc Change the completed state of a checkItem
 * @param idCheckItem, checkItemState, idBoard, idCard, idChecklist
 * @return CHECKITEM_SET_STATE action
 */
export const checkItemSetState = (idCheckItem, checkItemState, idBoard, idCard, idChecklist) => {
  return {
      type: CHECKITEM_SET_STATE,
      card: {
        id: idCard,
        checklist: {
          id: idChecklist,
          checkItem: {
            id: idCheckItem,
            state: checkItemState,
          }
        },
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
 * @desc Delete a checkItem from a checklist
 * @param idBoard, idCard,idChecklist, idCheckItem
 * @return DELETE_CHECKITEM action
 */
export const checkItemDelete = (idBoard, idCard, idChecklist, idCheckItem) => {
    return {
        type: DELETE_CHECKITEM,
        card: {
            id: idCard,
            checklist: {
                id: idChecklist,
                checkItem: {
                    id: idCheckItem
                }
            },
        },
        meta: {
            socket: {
                channel: 'data:store',
                room: idBoard,
            }
        }
    }
};
