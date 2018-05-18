import React from 'react';
import Purchase from './purchase';

class FullInvoice extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      invoiceNumber: '',
      date: '',
      amount: '',
      purchases: []
    }
  }

  componentDidMount() {
    fetch(`/api/v1/invoices/${this.props.id}`, {
      credentials: 'same-origin',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({
        id: body[0].id,
        invoiceNumber: body[0].invoice_number,
        amount: body[0].amount,
        date: body[0].date,
        purchases: body[0].purchases
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }


  render() {
    let allPurchases;
    allPurchases = this.state.purchases.map((purchase) => {
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
            <div>Invoice number: {this.state.invoiceNumber} Received: {this.state.date} Amount owed: {this.state.amount}</div>
              <h5> Product Name | Product ID | Unit Price | Quantity | Total</h5>
            <ul>{allPurchases}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default FullInvoice;
