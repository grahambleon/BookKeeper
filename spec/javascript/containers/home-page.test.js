import React from 'react';
import fetch from 'fetch-mock'
import { shallow, mount, render } from 'enzyme';
import HomePage from '../../../app/javascript/containers/home-page';

describe('<HomePage />', () => {
  const wrapper = mount(
    <HomePage />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })
})
