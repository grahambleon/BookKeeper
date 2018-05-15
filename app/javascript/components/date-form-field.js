import React from 'react'
import Datetime from 'react-datetime'

const DateFormField = (props) => {
  return (
    <div className="form_field">
      <label>
        {props.label}
      </label>
      <Datetime timeFormat={false} />
    </div>
  )
}

export default DateFormField;
