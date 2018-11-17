// Modules

/** Action types
 * Action types are constants string meant to explains reducer which treatments are needed.
 */
 export const CARD_SET_NAME = 'CARD_SET_NAME';
 export const CARD_SET_DESC = 'CARD_SET_DESC';
 export const CARD_SET_DUE = 'CARD_SET_DUE';
 export const CARD_SET_CLOSED = 'CARD_SET_CLOSED';
 export const CARD_SET_CHECKLISTS = 'CARD_SET_CHECKLISTS';
 export const CARD_ADD_CHECKLIST = 'CARD_ADD_CHECKLIST';
 export const CARD_SET_DUE_COMPLETE = 'CARD_SET_DUE_COMPLETE';
 export const CARD_ADD_MEMBER = 'CARD_ADD_MEMBER';
 export const CARD_DELETE_MEMBER = 'CARD_DELETE_MEMBER';
 export const CARD_ADD_LABEL = 'CARD_ADD_LABEL';
 export const CARD_DELETE_LABEL = 'CARD_DELETE_LABEL';

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


 /**
  * @desc Set the name of the card
  * @param idList, idCard, name, idBoard
  * @return CARD_SET_NAME action
  */
export const setName = (idList, idCard, name, idBoard) => {
  return {
      type: CARD_SET_NAME,
      list: {
        id: idList
      },
      card: {
        id: idCard,
        name
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
 * @desc Set the description of the card
 * @param idList, idCard, desc, idBoard
 * @return CARD_SET_DESC action
 */
export const setDesc = (idList, idCard, desc, idBoard) => {
  return {
      type: CARD_SET_DESC,
      list: {
        id: idList
      },
      card: {
        id: idCard,
        desc
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
 * @desc Set the due date for a card
 * @param idList, idCard, due, idBoard
 * @return CARD_SET_DUE action
 */
export const setDue = (idList, idCard, due, idBoard) => {
  return {
      type: CARD_SET_DUE,
      list: {
        id: idList
      },
      card: {
        id: idCard,
        due
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
 * @desc Set the completed status of the card
 * @param idList, idCard, dueComplete
 * @return CARD_SET_DUE_COMPLETE action
 */
export const setDueComplete = (idList, idCard, dueComplete) => {
    return {
        type: CARD_SET_DUE_COMPLETE,
        list: {
            id: idList
        },
        card: {
            id: idCard,
            dueComplete
        },
        meta: {
            socket: {
                channel: 'data:store'
            }
        }
    }
};


/**
 * @desc Set the archived status of the card
 * @param idList, idCard, closed, idBoard
 * @return CARD_SET_CLOSED action
 */
export const setClosed = (idList, idCard, closed, idBoard) => {
  return {
      type: CARD_SET_CLOSED,
      list: {
        id: idList
      },
      card: {
        id: idCard,
        closed
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
 * @desc Add a checklist to the card
 * @param idCard, checklist, idBoard
 * @return CARD_ADD_CHECKLIST action
 */
export const addChecklist = (idCard, checklist, idBoard) => {
  return {
      type: CARD_ADD_CHECKLIST,
      card: {
        id: idCard,
        checklist: checklist
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
 * @desc Set the checklists of the selected card
 * @param checklists
 * @return CARD_SET_CHECKLISTS action
 */
export const setChecklists = (checklists) => {
  return {
      type: CARD_SET_CHECKLISTS,
      card: {
        checklists: checklists
      },
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
  }
}

/**
 * @desc Add a member to a card
 * @param idCard, idMember, idList, idBoard
 * @return CARD_ADD_MEMBER action
 */
export const addMemberCard = (idCard, idMember, idList, idBoard) => {
  return {
      type: CARD_ADD_MEMBER,
      list: {
          id: idList
      },
      card: {
        id: idCard,
        member: {
          id: idMember,
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
 * @desc Delete a member from a card
 * @param idCard, idMember, idList, idBoard
 * @return CARD_DELETE_MEMBER action
 */
export const deleteMemberCard = (idCard, idMember, idList, idBoard) => {
  return {
      type: CARD_DELETE_MEMBER,
      list: {
          id: idList
      },
      card: {
        id: idCard,
        member: {
          id: idMember,
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
 * @desc Add a label to a card
 * @param idCard, idLabel, idList, idBoard
 * @return CARD_ADD_LABEL action
 */
export const addLabelCard = (idCard, idLabel, idList, idBoard) => {
  return {
      type: CARD_ADD_LABEL,
      list: {
          id: idList
      },
      card: {
        id: idCard,
        label: {
          id: idLabel,
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
 * @desc Delete a label from a card
 * @param idCard, idLabel, idList, idBoard
 * @return CARD_DELETE_LABEL action
 */
export const deleteLabelCard = (idCard, idLabel, idList, idBoard) => {
  return {
      type: CARD_DELETE_LABEL,
      list: {
          id: idList
      },
      card: {
        id: idCard,
        label: {
          id: idLabel,
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
