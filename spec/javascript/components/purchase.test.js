import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Purchase from '../../../app/javascript/components/purchase';


describe('<Purchase />', () => {

 const wrapper = mount(
    <Purchase
      product_id='0293874'
      product_name='Taters'
      unit_price='3.00 per pound'
      quantity='30 lbs'
      total_price='90.0'
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('displays the values given by props', () => {
    expect(wrapper.containsMatchingElement(
      <div>0293874 | Taters | 3.00 per pound | 30 lbs | 90.0</div>
    ))
  })
})
