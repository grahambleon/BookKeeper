import React from 'react';
import { shallow, mount, render } from 'enzyme';
import HomePage from '../../../app/javascript/containers/HomePage';

// describe what we are testing
describe('<HomePage />', () => {
 // make our assertion and what we expect to happen
 const wrapper = mount(<HomePage />)
 it('renders properly', () => {
   expect(wrapper.length).toBe(1);
 })

 it('renders a div with text', () => {
   expect(wrapper.find('.div').text()).toEqual('Hello!');
 })
})
