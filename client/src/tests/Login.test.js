import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { Login } from '../components/SignInOrSignUp/Login/Login';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from "../redux/store";

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<Login store={store}/>);
  });
  // it('Login\'s state values should be constant on creation', function () {
  //   let login = shallow(<Login store={store}/>);
  //   expect(login.state().badAccount).to.equal(false);
  //   expect(login.state().emailConfirmed).to.equal(true);
  //   expect(login.state().password).to.equal("");
  //   expect(login.state().username).to.equal("");
  // });
  // it('Login\'s state should change when told', function () {
  //   let login = shallow(<Login store={store}/>);
  //   login.instance().handleChange({target:{name: "userName", value: "myusername"}});
  //   expect(login.state().userName).to.equal("myusername");
  //   login.instance().handleReset();
  //   expect(login.state().userName).to.equal("");
  // });
});
