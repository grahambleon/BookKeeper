import React from 'react';
import InvoiceList from './invoice-list';
import AccountTile from '../components/account-tile'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: []
    }
  }

 componentDidMount() {
  fetch(`/api/v1/accounts`, {
    credentials: 'same-origin'
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

  render() {
    console.log(this.state);
    let page;
    page = this.state.userData.map((account) => {
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
      <div>{page}</div>
    )
  }
}
export default HomePage;
