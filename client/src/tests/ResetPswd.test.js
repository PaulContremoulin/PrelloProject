import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { ResetPswd } from '../components/SignInOrSignUp/ResetPswd/ResetPswd';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from "../redux/store";

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<ResetPswd />);
  });
  it('ResetPswd\'s state values should be constants', function () {
    let resetPswd = shallow(<ResetPswd />);
    expect(resetPswd.state().email).to.equal("");
    expect(resetPswd.state().emailIsSent).to.equal(false);
    expect(resetPswd.state().emailNotFound).to.equal(false);
  });
  it('ResetPswd\'s should change state when submited', function () {
    let resetPswd = shallow(<ResetPswd />);
    resetPswd.instance().handleChange({target: {value: "myemail"}});
    expect(resetPswd.state().email).to.equal("myemail");
  });
});
