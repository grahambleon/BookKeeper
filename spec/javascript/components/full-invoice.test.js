import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FullInvoice from '../../../app/javascript/components/full-invoice';
import fakeShowInvoice from '../fixtures/fakeShowInvoice.json';

describe('<FullInvoice />', () => {

  const wrapper = mount(
    <FullInvoice
      id={1}
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  // it('should have a default state { selected: false }', () => {
  //   fetch.mockResponseOnce(JSON.stringify({ data: '12345' }))
  //   expect(wrapper.state('id')).toEqual(1)
  // })
})
