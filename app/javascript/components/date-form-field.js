import React from 'react'
import Datetime from 'react-datetime'

const DateFormField = (props) => {
  return (
    <div className="form_field">
      <label>
        {props.label}
      </label>
      <Datetime
        input={false}
        timeFormat={false}
        value={props.value}
        onChange={props.handleChange}
      />
    </div>
  )
}

export default DateFormField;
