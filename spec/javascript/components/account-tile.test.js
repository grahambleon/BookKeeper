import React from 'react';
import { shallow, mount, render } from 'enzyme';
import AccountTile from '../../../app/javascript/components/account-tile';

describe('<AccountTile />', () => {

  const wrapper = mount(
    <AccountTile
      value='1'
      name='Russos'
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('has the value given by props', () => {
    expect(wrapper.props()).toEqual({ "name": "Russos", "value": "1" })
  })

  it('renders a div with text', () => {
    expect(wrapper.text()).toEqual('Russos');
  })
})
