import React from 'react';
import InvoiceFormField from '../components/invoice-form-field';

class InvoiceFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pendingSubmissions: [],
      companyName: '',
      invoiceNumber: '',
      amount: '',
      productId: '',
      productId: '',
      quantity: '',
      unitPrice: '',
      totalPrice: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log(this.state);
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
        </form>

        <div>Purchases:</div>

        <form>
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
        </form>

      </div>
    )
  }
}

export default InvoiceFormContainer;
