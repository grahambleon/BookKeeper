import React from 'react'

const InvoiceFormField = (props) => {
  return (
    <div className="form_field">
      <label>
        {props.label}
      </label>
      <input
        name={props.name}
        type='text'
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default InvoiceFormField;
