import React from 'react';

const Purchase = (props) => {
  let amount = Number(props.total_price).toFixed(2)
  return (
    <li> {props.product_name} | #{props.product_id} | ${props.unit_price} | {props.quantity} | ${amount}</li>
  )
}

export default Purchase;
