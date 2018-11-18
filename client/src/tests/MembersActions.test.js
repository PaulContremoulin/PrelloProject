import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/membersActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to add member when create a board', () => {
    const member = "";
    const expectedAction = {
      type: actions.ADD_MEMBER_CREATION,
      member
    }
    expect(actions.addMemberCreationBoard(member)) == (expectedAction)
  })
  it('should create an action to delete member when create a board', () => {
    const member = "";
    const expectedAction = {
      type: actions.DELETE_MEMBER_CREATION,
      member
    }
    expect(actions.deleteMemberCreationBoard(member)) == (expectedAction)
  })
  it('should create an action to fetch members when create a board', () => {
    const members = "";
    const expectedAction = {
      type: actions.FETCH_MEMBERS_CREATION,
      members
    }
    expect(actions.fetchMembersCreationBoard(members)) == (expectedAction)
  })
})
