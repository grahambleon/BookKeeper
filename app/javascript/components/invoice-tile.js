import React from 'react';
import FullInvoice from './full-invoice'

class InvoiceTile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
    this.showInvoice = this.showInvoice.bind(this)
  }

  showInvoice(event) {
    if (this.state.selected) {
      this.setState ({ selected: false })
    } else {
      this.setState ({ selected: true })
    }
  }


  render() {

    let overlay;
    if(this.state.selected) {
      overlay = <FullInvoice
        purchases={this.props.purchases}
        invoice_number={this.props.invoice_number}
        date={this.props.date_received}
        amount={this.props.amount}
      />
    }

    return (
      <div onClick={this.showInvoice} className="text-left invoice-tile">
        <li>Invoice number: {this.props.invoice_number} | Received: {this.props.date} | Amount owed: ${this.props.amount}</li>
        {overlay}
      </div>
    )
  }
}

export default InvoiceTile;
