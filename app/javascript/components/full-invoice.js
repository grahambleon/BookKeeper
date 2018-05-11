import React from 'react';
import Purchase from './purchase';

const FullInvoice = (props) => {
  let allPurchases;
  allPurchases = props.purchases.map((purchase) => {
    return(
      <Purchase
        key={purchase.id}
        product_id={purchase.product_id}
        product_name={purchase.product_name}
        unit_price={purchase.unit_price}
        quantity={purchase.quantity}
        total_price={purchase.total_price}
      />
    )
  })

  return (
    <div className="text-center">
      <div className="overlay">
        <div className="column medium-6 medium-centered text-center invoice">
          <h5>Invoice number: {props.invoice_number} Received: {props.date} Amount owed: {props.amount}</h5>
          <ul>{allPurchases}</ul>
        </div>
      </div>
    </div>
  )
}

export default FullInvoice;
