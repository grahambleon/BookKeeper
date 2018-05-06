import React from 'react';
import { shallow, mount, render } from 'enzyme';
import HomePage from '../../app/javascript/containers/HomePage';

// describe what we are testing
describe('HomePage', () => {

 // make our assertion and what we expect to happen
 it('should render without throwing an error', () => {
   expect(shallow(<HomePage />).exists(<div className='div'>Hello!</div>)).toBe(true)
 })
})
