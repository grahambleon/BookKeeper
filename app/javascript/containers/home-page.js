import React from 'react';
import InvoiceList from './invoice-list';
import AccountTile from '../components/account-tile'
import InvoiceFormField from '../components/invoice-form-field';
import DateFormField from '../components/date-form-field'
import Graph from './graph'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: [],
      invoices: [],
      header: 'Welcome',
      newAccountName: '',
      invoiceNumber: ''
    }
    this.findInvoicesByAccount = this.findInvoicesByAccount.bind(this)
    this.findInvoicesByNumber = this.findInvoicesByNumber.bind(this)
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this)
    this.addNewData = this.addNewData.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.findInvoicesByDate = this.findInvoicesByDate.bind(this)
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
      window.alert(`Successfully opened account: ${body.company_name}`);
      this.setState({
        accounts: this.state.accounts.concat(body)
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
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
        accounts: body
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }

  handleAccountSubmit(event) {
    event.preventDefault()
    let newAccount = {
      "company_name": this.state.newAccountName
    }
    this.addNewData(newAccount, `/api/v1/accounts.json`)
    this.setState({ newAccountName: '' })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  findInvoicesByDate(date) {
    fetch(`/api/v1/dates/${date.format('MM-DD-YYYY')}.json`, {
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
        invoices: body,
        header: body[0].date_received
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }

  findInvoicesByAccount(event){
    fetch(`/api/v1/accounts/${event.target.value}.json`, {
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
        invoices: body[0].invoices,
        header: body[0].company_name
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }

  findInvoicesByNumber(event){
    event.preventDefault()
    fetch(`/api/v1/invoice_number/${this.state.invoiceNumber}.json`, {
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
        invoices: body,
        header: body[0].invoice_number,
        invoiceNumber: ''
      });
    })
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }

  render() {
      let page = [];
      let accountList = [];

      accountList = this.state.accounts.map((account) => {
        return (
          <option
            key={account.id}
            value={account.id}
            onClick={this.findInvoicesByAccount}
            >
            {account.company_name}
          </option>
        )
    })

    page =
        <div>
          <AccountTile
            name={this.state.header}
          />
          <InvoiceList
            invoices={this.state.invoices}
          />
        </div>

    return (
      <div>
        <div className='row invoice-page'>
          <div className='columns medium-8 text-center list'>
            <div>{page}</div>
          </div>
          <div className='columns medium-4 options-panel'>
            <label>Select by account:</label>
            <select onChange={this.findInvoicesByAccount}>
              <option value='0'>---</option>
              {accountList}
            </select>
            <form onSubmit={this.findInvoicesByNumber}>
              <InvoiceFormField
                label='Select by invoice number:'
                name='invoiceNumber'
                value={this.state.invoiceNumber}
                handleChange={this.handleChange}
              />
            </form>
            <DateFormField
              label='Select by date:'
              handleChange={this.findInvoicesByDate}
            />
            <Graph accounts={accountList}/>
            <form onSubmit={this.handleAccountSubmit}>
              <InvoiceFormField
                label='Open New Account:'
                name='newAccountName'
                value={this.state.newAccountName}
                handleChange={this.handleChange}
              />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default HomePage;
