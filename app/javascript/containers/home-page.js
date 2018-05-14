import React from 'react';
import InvoiceList from './invoice-list';
import AccountTile from '../components/account-tile'
import InvoiceFormField from '../components/invoice-form-field';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: [],
      shownAccount: [],
      newAccountName: ''
    }
    this.sortInvoices = this.sortInvoices.bind(this)
    this.handleAccountSubmit = this.handleAccountSubmit.bind(this)
    this.addNewData = this.addNewData.bind(this)
    this.handleChange = this.handleChange.bind(this)
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

  sortInvoices(event){
    let selectedAccount = this.state.userData.filter((account) => {
      return (
        parseInt(account.id) === parseInt(event.target.value)
      )
    })
    this.setState({ shownAccount: selectedAccount })
  }

  render() {
    console.log(this.state);
      let page = [];
      let accountList = [];
      let companyList = [];
      accountList = this.state.userData.map((account) => {
        return (
          <option
            key={account.id}
            value={account.id}
            onClick={this.sortInvoices}
          >
            {account.company_name}
          </option>
        )
    })

    page = this.state.shownAccount.map((account) => {
      return (
        <div key={account.id}>
          <AccountTile
            name={account.company_name}
            value={account.id}
          />
          <InvoiceList
            invoices={account.invoices}
          />
        </div>
      )
    })

    return (
      <div>
        <div className='row'>
          <div className='columns medium-5'>
            <label>Select Account:</label>
            <select onChange={this.sortInvoices}>
              <option value='0'>---</option>
              {accountList}
            </select>
          </div>
          <div className='columns medium-5'>
            <form onSubmit={this.handleAccountSubmit}>
              <InvoiceFormField
                label='Create New Account:'
                name='newAccountName'
                value={this.state.newAccountName}
                handleChange={this.handleChange}
              />
            </form>
          </div>
        </div>

        <div className='row'>
          <div className='columns medium-12 text-center list'>
            <div>{page}</div>
          </div>
        </div>
      </div>
    )
  }
}
export default HomePage;
