import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/stateBoards';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to change state board', () => {
    const state = "";
    const expectedAction = {
      type: actions.SET_STATE,
      state,
    }
    expect(actions.changeState(state)) == (expectedAction)
  })
})
