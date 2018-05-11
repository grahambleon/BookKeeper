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

  it('has the correct text and value given by props', () => {
    expect(wrapper.containsMatchingElement(
      <div value='1' className="account-tile">Russos</div>
    ))
  })
})
