import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/listActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to change the name of a list', () => {
    const idList = "", name = "", idBoard = "";
    const expectedAction = {
      type: actions.LIST_SET_NAME,
      list: {
        id: idList,
        name,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
    }
    expect(actions.setListName(idList, name, idBoard)) == (expectedAction)
  })
  it('should create an action to change the archived status of a list', () => {
    const idList = "", closed = "", idBoard = "";
    const expectedAction = {
      type: actions.LIST_SET_CLOSED,
      list: {
        id: idList,
        closed,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
    }
    expect(actions.setListClosed(idList, closed, idBoard)) == (expectedAction)
  })
  it('should create an action to delete a list from the board', () => {
    const idList = "", idBoard = "";
    const expectedAction = {
        type: actions.LIST_DELETE,
        list: {
          id: idList,
        },
        meta: {
            socket: {
                channel: 'data:store',
                room: idBoard,
            }
        }
    }
    expect(actions.deleteList(idList, idBoard)) == (expectedAction)
  })
})
