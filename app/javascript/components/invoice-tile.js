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
        id={this.props.id}
      />
    }
    let amount = Number(this.props.amount).toFixed(2)
    return (
      <div onClick={this.showInvoice} className="text-left invoice-tile">
        <li>Invoice number: {this.props.invoice_number} | Received: {this.props.date} | Amount owed: ${amount}</li>
        {overlay}
      </div>
    )
  }
}

export default InvoiceTile;
