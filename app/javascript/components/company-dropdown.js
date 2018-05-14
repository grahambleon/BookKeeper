import React from 'react';

const CompanyDropdown = (props) => {
  let companies = [];
  companies = props.companyList.map((company) => {
    return (
      <option key={company.id} value={company.id}>{company.company_name}</option>
    )
  })

  return (
    <div>
      <label>
        {props.label}
      </label>
      <select onChange={props.handleChange} name={props.name}>
      <option value={null}>Select Account</option>
        {companies}
      </select>
    </div>
  )
}

export default CompanyDropdown;
