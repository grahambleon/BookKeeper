import React from 'react';
import InvoiceFormField from '../components/invoice-form-field';
import Purchase from '../components/purchase';
import CompanyDropdown from '../components/company-dropdown';
import DateFormField from '../components/date-form-field';
import Dropzone from 'react-dropzone';

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
      totalPrice: '',
      picture: []
    }
    this.addNewData = this.addNewData.bind(this)
    this.addPurchase = this.addPurchase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleInvoiceSubmit = this.handleInvoiceSubmit.bind(this)
    this.clearImage = this.clearImage.bind(this)
  }

  addNewData(payload, url) {
    fetch(url, {
      credentials: 'same-origin',
      method: 'POST',
      body: payload
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
      debugger;
      window.alert(`Successfully submitted invoice #${body.invoice_number}`);
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

  clearImage() {
    this.setState ({ picture: [] })
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

  handleDateChange(date) {
    this.setState({ date: date.format('L')})
  }

  handleInvoiceSubmit(event) {
    event.preventDefault()
    let formDataObject = new FormData()

      formDataObject.append("account_id", this.state.companyId)
      formDataObject.append("invoice_number", this.state.invoiceNumber)
      formDataObject.append("amount", this.state.amount)
      formDataObject.append("date_received", this.state.date)
      formDataObject.append("invoice_image", this.state.picture[0])
      formDataObject.append("purchases", JSON.stringify(this.state.pendingSubmissions))

    this.addNewData(formDataObject, `/api/v1/invoices`)
    this.setState({
      pendingSubmissions: [],
      invoiceNumber: '',
      amount: '',
      date: '',
      productId: '',
      productName: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
      picture: []
    })
  }

  onDrop(picture) {
    this.setState({
      picture
    });
  }

  render() {
    let purchases = [];
    let companyList = [];
    let currentCompany = [];
    let dropzoneIcon = '';

    if (this.state.picture.length) {
      dropzoneIcon = this.state.picture.map((file) => <img className="dropzone-icon" key={1} src={file.preview} />)
    } else {
      dropzoneIcon = <p>Drag a picture of your invoice here or click to choose the file.</p>
    }

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
        <div>
          <div className='column small-8 text-center invoice'>
            <h5>Invoice number: {this.state.invoiceNumber} | Received: {this.state.date} | Amount owed: ${this.state.amount}</h5>
            <h5> Product Name | Product ID | Unit Price | Quantity | Total</h5>
            <div>{purchases}</div>
          </div>
          <div className='column small-4 text-center form'>
            <button className="button" type="button" onClick={this.handleInvoiceSubmit}>Submit Invoice</button>
            <form>
              <CompanyDropdown
                companyList={companyList}
                label='Account'
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
              <DateFormField
                label='Date Received'
                name='date'
                value={this.state.date}
                handleChange={this.handleDateChange}
              />
              <div className='special-field'>
                <Dropzone
                  onDrop={this.onDrop.bind(this)}
                  multiple={false}
                >
                  {dropzoneIcon}
                </Dropzone>
              </div>
              <button type='button' onClick={this.clearImage}>Remove Image</button><br />

              <p>Purchase Info:</p>
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
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default InvoiceFormContainer;
