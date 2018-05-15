import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FullInvoice from '../../../app/javascript/components/full-invoice';
import testPurchases from '../fixtures/testPurchases.json'

describe('<FullInvoice />', () => {

  const wrapper = mount(
    <FullInvoice
      purchases={testPurchases}
      invoice_number='1337'
      date='2/4/2017'
      amount='200.0'
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('renders the correct text', () => {
    expect(wrapper.text()).toEqual('Invoice number: 1337 Received: 2/4/2017 Amount owed: 200.0 Product Name | Product ID | Unit Price | Quantity | Total Taters | 0293874 | 3.00 per pound | 30 lbs | 90.0');
  })

})
