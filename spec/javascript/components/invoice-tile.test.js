import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InvoiceTile from '../../../app/javascript/components/invoice-tile';
import fakeShowInvoice from '../fixtures/fakeShowInvoice.json'

describe('<InvoiceTile />', () => {

  const wrapper = mount(
    <InvoiceTile
      key={fakeShowInvoice[0].id}
      purchases={fakeShowInvoice[0].purchases}
      invoice_number={fakeShowInvoice[0].invoice_number}
      date={fakeShowInvoice[0].date_received}
      amount={fakeShowInvoice[0].amount}
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('should have a default state { selected: false }', () => {
    expect(wrapper.state('selected')).toEqual(false)
  })

  it('should have a state of { selected: true } when clicked', () => {
    wrapper.find('div').simulate('click')
    expect(wrapper.state('selected')).toEqual(true)
  })

  it('should have the basic invoice header info', () => {
    expect(wrapper.containsMatchingElement(
      <h5>Invoice number: 1337 Received: 2/4/2017 Amount owed: $200.0</h5>
    ))
  })
})
