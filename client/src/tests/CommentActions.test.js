import React from 'react';
import {configure} from 'enzyme';
import {expect} from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import * as actions from '../actions/commentActions';

configure({ adapter: new Adapter() });

describe('actions', () => {
  it('should create an action to set the comments to their default value', () => {
    const expectedAction = {
      type: actions.RESET_COMMENTS
    }
    expect(actions.resetComments()) == (expectedAction)
  })
  it('should create an action to setup the comments of the selected card', () => {
    const comments = "";
    const expectedAction = {
      type: actions.SET_COMMENTS,
      comments,
    }
    expect(actions.setComments(comments)) == (expectedAction)
  })
  it('should create an action to add a comment to the card', () => {
    const comment = "", idBoard = "";
    const expectedAction = {
        type: actions.ADD_COMMENT,
        comment,
        meta: {
            socket: {
                channel: 'data:store',
                room: idBoard,
            }
        }
    }
    expect(actions.addComment(comment, idBoard)) == (expectedAction)
  })
  it('should create an action to change the text of a comment', () => {
    const idComment = "", textComment = "", idBoard = "";
    const expectedAction = {
      type: actions.SET_TEXT_COMMENT,
      comment: {
        id: idComment,
        text: textComment,
      },
      meta: {
          socket: {
              channel: 'data:store',
              room: idBoard,
          }
      }
    }
    expect(actions.setTextComment(idComment, textComment, idBoard)) == (expectedAction)
  })
})
