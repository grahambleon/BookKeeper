import React from 'react';

const Purchase = (props) => {
  return (
    <h5> {props.product_name} | {props.product_id} | {props.unit_price} | {props.quantity} | {props.total_price}</h5>
  )
}

export default Purchase;
