import React from 'react';
import InvoiceFormField from '../components/invoice-form-field';
import Purchase from '../components/purchase'
import CompanyDropdown from '../components/company-dropdown'

class InvoiceFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      pendingSubmissions: [],
      companyId: '',
      invoiceNumber: '',
      amount: '',
      date: '',
      productId: '',
      productName: '',
      quantity: '',
      unitPrice: '',
      totalPrice: ''
    }
    this.addNewData = this.addNewData.bind(this)
    this.addPurchase = this.addPurchase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleInvoiceSubmit = this.handleInvoiceSubmit.bind(this)
  }

  addNewData(payload, url) {
    fetch(url, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(payload),
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
        userData: this.state.userData.concat(body)
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
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

  componentDidMount() {
   fetch(`/api/v1/accounts`, {
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
       userData: body
     });
   })
   .catch(error => console.error (`Error in fetch: ${error.message}`));
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleInvoiceSubmit(event) {
    event.preventDefault()
    let newInvoice = {
      "company_id": this.state.companyId,
      "invoice_number": this.state.invoiceNumber,
      "amount": this.state.amount,
      "date": this.state.date,
      "purchases": this.state.pendingSubmissions
    }
    this.props.submitNewData(newInvoice, `/api/v1/invoices.json`)
    this.setState({
      pendingSubmissions: [],
      companyId: '',
      invoiceNumber: '',
      amount: '',
      date: '',
      productId: '',
      productName: '',
      quantity: '',
      unitPrice: '',
      totalPrice: ''
    })
  }

  render() {
console.log(this.state);
    let purchases = [];
    let companyList = [];
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

    companyList = this.state.userData.map((company) => {
      return (
        { "id": company.id,
          "company_name": company.company_name
        }
      )
    })

    return(
      <div>
        <p>New Invoice:</p>
        <form>
          <CompanyDropdown
            companyList={companyList}
            label='Account Name'
            name='companyId'
            value={this.state.companyId}
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
          <InvoiceFormField
            label='Date Received'
            name='date'
            value={this.state.date}
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
          <button className="button" type="button" onClick={this.addPurchase}>Save Purchase</button>
          <button className="button" type="button" onClick={this.handleInvoiceSubmit}>Submit Invoice</button>
        </form>
      </div>
    )
  }
}

export default InvoiceFormContainer;
