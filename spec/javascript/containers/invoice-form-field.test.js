import React from 'react';
import { shallow, mount, render } from 'enzyme';
import InvoiceFormField from '../../../app/javascript/components/invoice-form-field';

describe('<InvoiceFormField />', () => {
  const wrapper = mount(
    <InvoiceFormField
      label='Test Form Field'
      name='testField'
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it('should render a label based on the given props', () => {
    expect(wrapper.containsMatchingElement(
      <label>Test Form Field</label>
    ))
  })

  it('should have an input field', () => {
    expect(wrapper.containsMatchingElement(
      <input name='testField'/>
    ))
  })

})
