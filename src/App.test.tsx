import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App Component', () => {
  it('renders learn react link', () => {
    const wrapper = shallow(<App />);

    const anchor = wrapper.find('a');

    expect(anchor.text()).toContain('Learn React');
  });
});
