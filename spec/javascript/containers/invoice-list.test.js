import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InvoiceList from '../../../app/javascript/containers/invoice-list';
import testInvoices from '../fixtures/testInvoices.json'

describe('<InvoiceList />', () => {

  const wrapper = mount(
    <InvoiceList invoices={testInvoices}/>
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('renders the expected text', () => {
    expect(wrapper.containsMatchingElement(
      <div>Invoice number: 1337 Received: 2/4/2017 Amount owed: $200.0</div>
    ))
  })
})
