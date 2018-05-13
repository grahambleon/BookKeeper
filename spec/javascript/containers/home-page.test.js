import React from 'react';
import { shallow, mount, render } from 'enzyme';
import HomePage from '../../../app/javascript/containers/home-page';
import backendData from '../fixtures/userData.json'

describe('<HomePage />', () => {

  fetch.mockResponseOnce(JSON.stringify(backendData), {status: 200})

  const wrapper = mount(
    <HomePage />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('issues a successful fetch call for user data and stores it in state', () => {
    expect(wrapper.state('userData').length).toEqual(1)
  })
})
