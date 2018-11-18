import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/labelActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to set the labels of the selected board', () => {
    const labels = "";
    const expectedAction = {
      type: actions.SET_LABELS,
      labels,
    }
    expect(actions.setLabels(labels)) == (expectedAction)
  })
  it('should create an action to add a label to the board', () => {
    const label = "", idBoard = "";
    const expectedAction = {
      type: actions.ADD_LABEL,
      label,
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
    }
    expect(actions.addLabel(label, idBoard)) == (expectedAction)
  })
  it('should create an action to change the name of a label', () => {
    const idLabel = "", nameLabel =  "", idBoard = "";
    const expectedAction = {
        type: actions.SET_NAME_LABEL,
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
    expect(actions.setNameLabel(idLabel, nameLabel, idBoard)) == (expectedAction)
  })
  it('should create an action to change the color of a label', () => {
    const idLabel = "", colorLabel = "", idBoard = "";
    const expectedAction = {
        type: actions.SET_COLOR_LABEL,
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
    expect(actions.setColorLabel(idLabel, colorLabel, idBoard)) == (expectedAction)
  })
  it('should create an action to delete a label from the board', () => {
    const idLabel = "", idBoard = "";
    const expectedAction = {
        type: actions.DELETE_LABEL,
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
    expect(actions.deleteLabelFromBoard(idLabel, idBoard)) == (expectedAction)
  })
})
