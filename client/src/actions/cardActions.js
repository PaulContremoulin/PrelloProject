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

/** Action Builders
 * Action Builders are function that return an action following this rule of thumb :
 * Whenever an given Action is dispatched on the Redux store with a given state,
 * the resulting state is always the same produced.
 * This mean also that random values are created by the Action Builder
 */


/**
* @desc
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
* @desc
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
* @desc
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
* @desc
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

export const addMemberCard = (idCard, idMember, idList, idBoard) => {
  return {
      type: CARD_ADD_MEMBER,
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

export const deleteMemberCard = (idCard, idMember, idList, idBoard) => {
  return {
      type: CARD_DELETE_MEMBER,
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
