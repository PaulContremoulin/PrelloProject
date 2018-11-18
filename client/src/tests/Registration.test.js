import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { Registration } from '../components/SignInOrSignUp/Registration/Registration';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from "../redux/store";

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<Registration store={store}/>);
  });
  // it('Registration\'s state values should be empty', function () {
  //   let registration = shallow(<Registration store={store}/>);
  //   expect(registration.state().userName).to.equal('');
  //   expect(registration.state().firstName).to.equal('');
  //   expect(registration.state().lastName).to.equal('');
  //   expect(registration.state().email).to.equal('');
  //   expect(registration.state().passwordA).to.equal('');
  //   expect(registration.state().passwordB).to.equal('');
  //   expect(registration.state().organisation).to.equal('');
  //   expect(registration.state().allFieldsFilled).to.equal(true);
  //   expect(registration.state().passwordsMatch).to.equal(true);
  //   expect(registration.state().passwordIsValid).to.equal(true);
  //   expect(registration.state().emailIsValid).to.equal(true);
  //   expect(registration.state().emailExist).to.equal(false);
  //   expect(registration.state().usernameExist).to.equal(false);
  //   expect(registration.state().emailUsernameExist).to.equal(false);
  //   expect(registration.state().badRequest).to.equal(false);
  // });
  //
  // it('Registration\'s should change state when submited', function () {
  //   let registration = shallow(<Registration store={store}/>);
  //   registration.instance().handleSubmit({preventDefault: () => {}});
  //   expect(registration.state().allFieldsFilled).to.equal(false);
  // });
  //
  // it('Registration\'s setStateElement should update element', function () {
  //   let registration = shallow(<Registration store={store}/>);
  //   registration.instance().setStateElement("userName", "Florian");
  //   expect(registration.state().userName).to.equal("Florian");
  // });
});
