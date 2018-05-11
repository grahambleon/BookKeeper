import React from 'react';

const Purchase = (props) => {
  return (
    <div>{props.product_id} | {props.product_name} | {props.unit_price} | {props.quantity} | {props.total_price}</div>
  )
}

export default Purchase;
