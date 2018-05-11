import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InvoiceTile from '../../../app/javascript/components/invoice-tile';

describe('<InvoiceTile />', () => {
  let testInvoices;
  testInvoices = [{
    "id": 1,
    "invoice_number": "1337",
    "amount": "200.0",
    "date_received": "2/4/2017",
    "account_id": 1,
    "purchases": [
      {
        "id": 1,
        "product_id": "0293874",
        "product_name": "Taters",
        "quantity": "30 lbs",
        "unit_price": "3.00 per pound",
        "total_price": "90.0",
        "account_id": 1,
        "invoice_id": 1
      }
    ]
  }]

  const wrapper = mount(
    <InvoiceTile
      key={testInvoices[0].id}
      purchases={testInvoices[0].purchases}
      invoice_number={testInvoices[0].invoice_number}
      date={testInvoices[0].date_received}
      amount={testInvoices[0].amount}
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('has the value given by props', () => {
    expect(wrapper.props()).toEqual({"amount": "200.0", "date": "2/4/2017", "invoice_number": "1337", "purchases": [{"account_id": 1, "id": 1, "invoice_id": 1, "product_id": "0293874", "product_name": "Taters", "quantity": "30 lbs", "total_price": "90.0", "unit_price": "3.00 per pound"}]})
  })

  it('should have a default state { selected: false }', () => {
    expect(wrapper.state('selected')).toEqual(false)
  })

  it('should have a state of { selected: true } when clicked', () => {
    wrapper.find('div').simulate('click')
    expect(wrapper.state('selected')).toEqual(true)
  })
})
