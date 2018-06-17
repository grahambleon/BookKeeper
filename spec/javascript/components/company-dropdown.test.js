import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CompanyDropdown from '../../../app/javascript/components/company-dropdown';
import fakeAccountIndex from '../fixtures/fakeAccountIndex.json'

describe('<CompanyDropdown />', () => {

  const wrapper = mount(
    <CompanyDropdown
      companyList={fakeAccountIndex}
      label='Account'
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })
})
