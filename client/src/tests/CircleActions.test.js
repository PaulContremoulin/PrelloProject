import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/circleActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to fetch all circles of the user', () => {
    const circles = "";
    const expectedAction = {
      type: actions.FETCH_CIRCLES,
      circles
    }
    expect(actions.fetchCircles(circles)) == (expectedAction)
  })
  it('should create an action to add a circle', () => {
    const data = "";
    const expectedAction = {
      type: actions.LIST_SET_CLOSED,
      circle: data
    }
    expect(actions.addCircle(data)) == (expectedAction)
  })
  it('should create an action to set a circle', () => {
    const circle = "";
    const expectedAction = {
        type: actions.FETCH_CIRCLE,
        circle
    }
    expect(actions.setCircle(circle)) == (expectedAction)
  })
  it('should create an action to delete boards from a circle', () => {
    const boardId = "";
    const expectedAction = {
      type: actions.LIST_SET_NAME,
      boardId: boardId,
    }
    expect(actions.deleteBoardsCircle(boardId)) == (expectedAction)
  })
  it('should create an action to delete a circle', () => {
    const circleId = "";
    const expectedAction = {
      type: actions.DELETE_CIRCLE,
      circleId: circleId,
    }
    expect(actions.deleteCircle(circleId)) == (expectedAction)
  })
  it('should create an action to edit a circle', () => {
    const circle = "";
    const expectedAction = {
        type: actions.EDIT_CIRCLE,
        circle
    }
    expect(actions.editCircle(circle)) == (expectedAction)
  })
})
