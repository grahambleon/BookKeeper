import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InvoiceList from '../../../app/javascript/containers/invoice-list';

describe('<InvoiceList />', () => {
  let testInvoices;
  testInvoices = [
    {
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
    }
  ]

  const wrapper = mount(
    <InvoiceList invoices={testInvoices}/>
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('has the correct data given by props', () => {
    expect(wrapper.props()).toEqual({
      "invoices": [{
        "account_id": 1,
        "amount": "200.0",
        "date_received": "2/4/2017",
        "id": 1,
        "invoice_number": "1337",
        "purchases":
          [{"account_id": 1, "id": 1, "invoice_id": 1, "product_id": "0293874", "product_name": "Taters", "quantity": "30 lbs", "total_price": "90.0", "unit_price": "3.00 per pound"}]}]})
  })

  it('renders the expected text', () => {
    expect(wrapper.text()).toEqual('Invoice number: 1337 Received: 2/4/2017 Amount owed: $200.0');
  })
})
