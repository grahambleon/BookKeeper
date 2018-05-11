import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FullInvoice from '../../../app/javascript/components/full-invoice';


describe('<FullInvoice />', () => {
  let testPurchases;
  testPurchases = [{
    "id": "1",
    "product_id": "0293874",
    "product_name": "Taters",
    "quantity": "30 lbs",
    "unit_price": "3.00 per pound",
    "total_price": "90.0"
  }]
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

  it('has the correct props', () => {
    expect(wrapper.props()).toEqual({
      "amount": "200.0",
      "date": "2/4/2017",
      "invoice_number": "1337",
      "purchases": [{
        "id": "1",
        "product_id": "0293874",
        "product_name": "Taters",
        "quantity": "30 lbs",
        "total_price": "90.0",
        "unit_price": "3.00 per pound"
      }]
    })
  })

  it('renders the correct text', () => {
    expect(wrapper.text()).toEqual('Invoice number: 1337 Received: 2/4/2017 Amount owed: 200.00293874 | Taters | 3.00 per pound | 30 lbs | 90.0');
  })

})
