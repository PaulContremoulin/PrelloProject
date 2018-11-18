import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/boardActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to add board', () => {
    const data = {text: 'Finish docs', _id: "boardId"}
    const expectedAction = {
      type: actions.ADD_BOARD,
      data
    }
    expect(actions.addBoard(data)) == (expectedAction)
  })
  it('should create an action to set boards', () => {
    const boards = {}
    const expectedAction = {
      type: actions.FETCH_BOARD,
      boards
    }
    expect(actions.fetchBoards(boards)) == (expectedAction)
  })
  it('should create an action to set board', () => {
    const board = {}
    const expectedAction = {
      type: actions.SET_BOARD,
      board
    }
    expect(actions.setBoard(board)) == (expectedAction)
  })
  it('should create an action to edit the infos of the board', () => {
    const board = {}
    const expectedAction = {
      type: actions.EDIT_INFORMATION_BOARD,
      board
    }
    expect(actions.editInformationsBoard(board)) == (expectedAction)
  })
  it('should create an action to change the state of the board', () => {
    const state = {}
    const expectedAction = {
      type: actions.EDIT_STATE_BOARD,
      state
    }
    expect(actions.changeStateBoard(state)) == (expectedAction)
  })
  it('should create an action to set the board members', () => {
    const listMembers = {}
    const expectedAction = {
      type: actions.SET_BOARD_MEMBERS,
      listMembers
    }
    expect(actions.setBoardMembers(listMembers)) == (expectedAction)
  })
  it('should create an action to add a member', () => {
    const member = {}
    const expectedAction = {
      type: actions.ADD_MEMBER,
      member
    }
    expect(actions.addMemberAction(member)) == (expectedAction)
  })
  it('should create an action to edit a member', () => {
    const member = {}
    const expectedAction = {
      type: actions.EDIT_ROLE_MEMBER,
      member
    }
    expect(actions.editRoleMember(member)) == (expectedAction)
  })
  it('should create an action to add a list', () => {
    const list = {_id: "", name: "", closed: false, idBoard: "", pos: 0, subscribed: false, cards: [] }
    const expectedAction = {
      type: actions.ADD_LIST,
      list: {
        id: list._id,
        name: list.name,
        closed: list.closed,
        idBoard: list.idBoard,
        pos: list.pos,
        subscribed: false,
        cards: []
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: list.idBoard,
          }
      }
    }
    expect(actions.addList(list)) == (expectedAction)
  })
  it('should create an action to add a card', () => {
    const card = {_id: "", name: "", closed: false, desc: "", due: "", dueComplete: "", idList: "", idBoard: "", pos: 0, idLabels: "", idMembers: "" }
    const expectedAction = {
      type: actions.ADD_CARD,
      card: {
        id: card._id,
        _id: card._id,
        name: card.name,
        closed: card.closed,
        desc: card.desc,
        due: card.due,
        dueComplete: card.dueComplete,
        pos: card.pos,
        idList: card.idList,
        idBoard: card.idBoard,
        idMembers: card.idMembers,
        idLabels: card.idLabels,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: card.idBoard,
          }
      }
    }
    expect(actions.addCard(card)) == (expectedAction)
  })
  it('should create an action to delete a card', () => {
    const card = {id: "", idList: "", idBoard: "" }
    const expectedAction = {
      type: actions.DELETE_CARD,
      list: {
          id: card.idList
      },
      card: {
          id: card.id
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: card.idBoard,
          }
      }
    }
    expect(actions.deleteCard(card)) == (expectedAction)
  })
  it('should create an action to move a list', () => {
    const lists = [{ idBoard: "" }]
    const expectedAction = {
      type: actions.MOVE_LIST,
      lists,
      meta: {
          socket: {
              channel: 'data:store',
              room: lists.idBoard,
          }
      }
    }
    expect(actions.moveList(lists)) == (expectedAction)
  })
  it('should create an action to move a card', () => {
    const list = { idBoard: "" };
    const indexOfList = 1;
    const expectedAction = {
      type: actions.MOVE_CARD,
      list,
      indexOfList,
      meta: {
          socket: {
              channel: 'data:store',
              room: list.idBoard,
          }
      }
    }
    expect(actions.moveCard(list, indexOfList)) == (expectedAction)
  })
  it('should create an action to move a card', () => {
    const list = { idBoard: "" };
    const indexOfList = 1;
    const expectedAction = {
      type: actions.MOVE_CARD_FROM_LIST,
      startList: list,
      endList: list,
      indexStart: indexOfList,
      indexEnd: indexOfList,
      meta: {
          socket: {
              channel: 'data:store',
              room: list.idBoard,
          }
      }
    }
    expect(actions.moveCard(list, indexOfList, list, indexOfList)) == (expectedAction)
  })
})
