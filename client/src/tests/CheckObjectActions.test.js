import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/checkObjectActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to set the checklists reducer to the default value', () => {
    const expectedAction = {
      type: actions.RESET_CHECKLISTS,
    }
    expect(actions.resetChecklists()) == (expectedAction)
  })
  it('should create an action to change the name of a checklist', () => {
    const idChecklist = "", checklistName = "", idBoard = "";
    const expectedAction = {
      type: actions.CHECKLIST_SET_NAME,
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
    expect(actions.checklistSetName(idChecklist, checklistName, idBoard)) == (expectedAction)
  })
  it('should create an action to change the position of a checklist', () => {
    const idChecklist = "", checklistPos = "", idBoard = "", idCard = "";
    const expectedAction = {
        type: actions.CHECKLIST_SET_POS,
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
    expect(actions.checklistSetPos(idChecklist, checklistPos, idBoard, idCard)) == (expectedAction)
  })
  it('should create an action to change the name of a checkitem', () => {
    const idCheckItem = "", checkItemName = "", idBoard = "", idCard = "", idChecklist = "";
    const expectedAction = {
        type: actions.CHECKITEM_SET_NAME,
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
    expect(actions.checkItemSetName(idCheckItem, checkItemName, idBoard, idCard, idChecklist)) == (expectedAction)
  })
  it('should create an action to delete a checklist from a card', () => {
    const idChecklist = "", idBoard = "", idCard = "";
    const expectedAction = {
        type: actions.DELETE_CHECKLIST,
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
    expect(actions.checkListDelete(idBoard, idCard, idChecklist)) == (expectedAction)
  })
  it('should create an action to add a checkItem to a card', () => {
    const idChecklist = "", idBoard = "", idCard = "", checkItem = "";
    const expectedAction = {
        type: actions.ADD_CHECKITEM,
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
    expect(actions.addCheckItem(idBoard, idCard, idChecklist, checkItem)) == (expectedAction)
  })
  it('should create an action to change the position of a checkItem in a  checklist', () => {
    const idChecklist = "", idBoard = "", idCard = "", checkItemPos = "", idCheckItem = "";
    const expectedAction = {
        type: actions.CHECKITEM_SET_POS,
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
    expect(actions.checkItemSetPos(idCheckItem, checkItemPos, idBoard, idCard, idChecklist)) == (expectedAction)
  })
  it('should create an action to change the completed state of a checkItem', () => {
    const idChecklist = "", idBoard = "", idCard = "", checkItemState = "", idCheckItem = "";
    const expectedAction = {
        type: actions.CHECKITEM_SET_STATE,
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
    expect(actions.checkItemSetState(idCheckItem, checkItemState, idBoard, idCard, idChecklist)) == (expectedAction)
  })
  it('should create an action to delete a checkItem from a checklist', () => {
    const idChecklist = "", idBoard = "", idCard = "", idCheckItem = "";
    const expectedAction = {
        type: actions.DELETE_CHECKITEM,
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
    expect(actions.checkItemDelete(idBoard, idCard, idChecklist, idCheckItem)) == (expectedAction)
  })
})
