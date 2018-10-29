import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { Sign } from '../components/SignInOrSignUp/Sign';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<Sign />);
  });
  it('Sign\'s mode should be on Login', function () {
    let sign = shallow(<Sign/>);
    expect(sign.state().signUpMode).to.equal(false);
  });
  it('Sign\'s mode should change when told', function () {
    let sign = shallow(<Sign/>);
    sign.instance().changeMode()
    expect(sign.state().signUpMode).to.equal(true);
  });
});
