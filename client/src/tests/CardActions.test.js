import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/cardActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to set the name of the card', () => {
    const idList = "", idCard = "", name = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_SET_NAME,
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
    expect(actions.setName(idList, idCard, name, idBoard)) == (expectedAction)
  })
  it('should create an action to set the description of the card', () => {
    const idList = "", idCard = "", desc = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_SET_DESC,
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
    expect(actions.setDesc(idList, idCard, desc, idBoard)) == (expectedAction)
  })
  it('should create an action to set the due date for a card', () => {
    const idList = "", idCard = "", due = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_SET_DUE,
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
    expect(actions.setDue(idList, idCard, due, idBoard)) == (expectedAction)
  })
  it('should create an action to set the completed status of the card', () => {
    const idList = "", idCard = "", dueComplete = "";
    const expectedAction = {
      type: actions.CARD_SET_DUE_COMPLETE,
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
    expect(actions.setDueComplete(idList, idCard, dueComplete)) == (expectedAction)
  })
  it('should create an action to set the archived status of the card', () => {
    const idList = "", idCard = "", closed = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_SET_CLOSED,
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
    expect(actions.setClosed(idList, idCard, closed, idBoard)) == (expectedAction)
  })
  it('should create an action to set the checklists of the selected card', () => {
    const checklists = {};
    const expectedAction = {
      type: actions.CARD_SET_CHECKLISTS,
      card: {
        checklists: checklists
      },
      meta: {
          socket: {
              channel: 'data:store'
          }
      }
    }
    expect(actions.setChecklists(checklists)) == (expectedAction)
  })
  it('should create an action to add a checklist to the card', () => {
    const idCard = "", checklist = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_ADD_CHECKLIST,
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
    expect(actions.addChecklist(idCard, checklist, idBoard)) == (expectedAction)
  })
  it('should create an action to delete a member from a card', () => {
    const idCard = "", idMember = "", idList = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_ADD_MEMBER,
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
    expect(actions.addMemberCard(idCard, idMember, idList, idBoard)) == (expectedAction)
  })
  it('should create an action to add a list', () => {
    const idCard = "", idMember = "", idList = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_DELETE_MEMBER,
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
    expect(actions.deleteMemberCard(idCard, idMember, idList, idBoard)) == (expectedAction)
  })
  it('should create an action to add a label to a card', () => {
    const idCard = "", idLabel = "", idList = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_ADD_LABEL,
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
    expect(actions.addLabelCard(idCard, idLabel, idList, idBoard)) == (expectedAction)
  })
  it('should create an action to delete a label from a card', () => {
    const idCard = "", idLabel = "", idList = "", idBoard = "";
    const expectedAction = {
      type: actions.CARD_DELETE_LABEL,
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
    expect(actions.deleteLabelCard(idCard, idLabel, idList, idBoard)) == (expectedAction)
  })
})
