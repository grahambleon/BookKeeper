import React from 'react';
import InvoiceFormField from '../components/invoice-form-field';
import Purchase from '../components/purchase'

class InvoiceFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingSubmissions: [],
      companyName: '',
      invoiceNumber: '',
      amount: '',
      productId: '',
      productName: '',
      quantity: '',
      unitPrice: '',
      totalPrice: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.addPurchase = this.addPurchase.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  addPurchase(event) {
    event.preventDefault()
    let formPayload = {
      product_id: this.state.productId,
      product_name: this.state.productName,
      quantity: this.state.quantity,
      unit_price: this.state.unitPrice,
      total_price: this.state.totalPrice
    }
    this.setState ({
      productId: '',
      productName: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
      pendingSubmissions: this.state.pendingSubmissions.concat(formPayload)
    })
  }

  render() {
    console.log(this.state);

    let purchases = [];
    purchases = this.state.pendingSubmissions.map((purchase) => {
      return(
        <Purchase
          key={purchase.product_id}
          product_id={purchase.product_id}
          product_name={purchase.product_name}
          unit_price={purchase.unit_price}
          quantity={purchase.quantity}
          total_price={purchase.total_price}
        />
      )
    })

    return(
      <div>
        <form>
          <InvoiceFormField
            label='Company Name'
            name='companyName'
            value={this.state.companyName}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Invoice Number'
            name='invoiceNumber'
            value={this.state.invoiceNumber}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Amount Owed'
            name='amount'
            value={this.state.amount}
            handleChange={this.handleChange}
          />

        <div>Purchases:</div>

        <div>{purchases}</div>

          <InvoiceFormField
            label='Product Id'
            name='productId'
            value={this.state.productId}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Product Name'
            name='productName'
            value={this.state.productName}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Quantity'
            name='quantity'
            value={this.state.quantity}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Unit Price'
            name='unitPrice'
            value={this.state.unitPrice}
            handleChange={this.handleChange}
          />
          <InvoiceFormField
            label='Total Price'
            name='totalPrice'
            value={this.state.totalPrice}
            handleChange={this.handleChange}
          />
          <button className="button" type="submit" onClick={this.addPurchase}>Save Purchase</button>
        </form>

      </div>
    )
  }
}

export default InvoiceFormContainer;
