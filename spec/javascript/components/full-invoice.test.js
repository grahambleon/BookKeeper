import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FullInvoice from '../../../app/javascript/components/full-invoice';
import fakeShowInvoice from '../fixtures/fakeShowInvoice.json';
import fetchMock from 'fetch-mock'

describe('<FullInvoice />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <FullInvoice
        id={1}
      />
    )
    fetchMock.get(`/api/v1/invoices/${wrapper.props.id}`, {
      status: 200,
      body: fakeShowInvoice
    });
  })

  afterEach(fetchMock.restore)

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('should fetch the invoices information', () => {
    setTimeout(() => {
      expect(wrapper.state('invoiceNumber')).toEqual("1337")
      done()
    }, 0)
  })

  it('should fetch purchases for the invoice', () => {
    setTimeout(() => {
      expect(wrapper.state('purchases')).toHaveLength(1)
      expect(wrapper.state('purchases')[0].product_name).toEqual("Taters")
      done()
    }, 0)
  })

  it('should render text based on the information retreived', () => {
    setTimeout(() => {
      expect(wrapper.containsMatchingElement(
        <div>Invoice number: 2/4/2017</div>
      )).toBeTruthy()
      done()
    }, 0)
  })
})
