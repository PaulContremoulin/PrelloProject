import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { Registration } from '../components/Registration/Registration';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<Registration onClick={ () => "" } />);
  });
  it('Registration\'s step should be on One', function () {
    let registration = shallow(<Registration onClick={ () => "" } />);
    expect(registration.state().stepOne).to.equal(true);
  });
  it('Registration\'s step should not be on Two', function () {
    let registration = shallow(<Registration onClick={ () => "" } />);
    expect(registration.state().stepTwo).to.equal(false);
  });
  it('Registration\'s state values should be empty', function () {
    let registration = shallow(<Registration onClick={ () => "" } />);
    expect(registration.state().userName).to.equal("");
    expect(registration.state().firstName).to.equal("");
    expect(registration.state().lastName).to.equal("");
    expect(registration.state().email).to.equal("");
    expect(registration.state().passwordA).to.equal("");
    expect(registration.state().passwordB).to.equal("");
    expect(registration.state().organisation).to.equal("");
    expect(registration.state().passwordA).to.equal("");
  });

  it('Registration\'s changeStep should update stepOne and stepTwo', function () {
    let registration = shallow(<Registration onClick={ () => "" } />);
    registration.instance().changeStep();
    expect(registration.state().stepOne).to.equal(false);
    expect(registration.state().stepTwo).to.equal(true);
  });

  it('Registration\'s setStateElement should update element', function () {
    let registration = shallow(<Registration onClick={ () => "" } />);
    registration.instance().setStateElement("userName", "Florian");
    expect(registration.state().userName).to.equal("Florian");
  });
});
