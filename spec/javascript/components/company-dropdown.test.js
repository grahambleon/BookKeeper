import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CompanyDropdown from '../../../app/javascript/components/company-dropdown';
import fakeAccountIndex from '../fixtures/fakeAccountIndex.json'

const fakeHandleChange = jest.fn();

describe('<CompanyDropdown />', () => {

  const wrapper = mount(
    <CompanyDropdown
      companyList={fakeAccountIndex}
      label='Account'
      handleChange={fakeHandleChange}
    />
  )

  it('renders properly', () => {
    expect(wrapper.length).toBe(1);
  })

  it("when simulating a change, select should update its value", () => {
    wrapper.find('select').simulate('change',{target: { value : '2'}});
    expect(fakeHandleChange).toHaveBeenCalled();
  });
})
