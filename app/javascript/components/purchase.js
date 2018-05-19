import React from 'react';

const Purchase = (props) => {
  return (
    <li> {props.product_name} | #{props.product_id} | ${props.unit_price} | {props.quantity} | ${props.total_price}</li>
  )
}

export default Purchase;
