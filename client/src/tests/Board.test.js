import React from 'react';
import {shallow, mount, render, configure} from 'enzyme';
import {expect} from 'chai';
import { Board } from '../components/Board/Board';
import Adapter from 'enzyme-adapter-react-16';
import {DEFAULT_BOARD} from '../constants';

configure({ adapter: new Adapter() });

describe('Enzyme Shallow', function () {
  it('renders without crashing', () => {
    shallow(<Board board={DEFAULT_BOARD}/>);
  });
});
