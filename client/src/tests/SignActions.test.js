import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/signActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to set the user login', () => {
    const user = "";
    const expectedAction = {
      type: actions.SET_LOGIN,
      user: user,
    }
    expect(actions.setLogin(user)) == (expectedAction)
  })
  it('should create an action to unset the user login', () => {
    const expectedAction = {
      type: actions.LOG_OUT,
    }
    expect(actions.logOut()) == (expectedAction)
  })
  it('should create an action to change user information', () => {
    const userEdit = "";
    const expectedAction = {
      type: actions.EDIT_INFORMATION_USER,
      userEdit
    }
    expect(actions.changeInformationAction(userEdit)) == (expectedAction)
  })
})
