import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FullInvoice from '../../../app/javascript/components/full-invoice';
import fakeShowInvoice from '../fixtures/fakeShowInvoice.json';
import fetchMock from 'fetch-mock'

let wrapper;

beforeEach(() => {
  wrapper = mount(
    <FullInvoice
      id={2}
    />
  )
  fetchMock.get(`/api/v1/invoices/${wrapper.id}`, {
    status: 200,
    body: fakeShowInvoice
  });
})

afterEach(fetchMock.restore)

describe('<FullInvoice />', () => {

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('should fetch purchases for the invoice', () => {
    setTimeout(() => {
      expect(wrapper.state('invoiceNumber')).toEqual("1337")
      done()
    }, 0)
  })

  it('should fetch purchases for the invoice', () => {
    setTimeout(() => {
      expect(wrapper.state('purchases').length).toEqual(1)
      expect(wrapper.state('purchases')[0].product_name).toEqual("Taters")
      done()
    }, 0)
  })
})
