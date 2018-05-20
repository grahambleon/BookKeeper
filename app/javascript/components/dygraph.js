import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.css'
// import './graphComponent.css';

class DyGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      invoices: []
    }
    this.createGraphByAccount = this.createGraphByAccount.bind(this)
  }

  createGraphByAccount(event){
    let data;
    data = 'Date, '
    fetch(`/api/v1/graph/${event.target.value}`, {
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
        account: body[0].company_name,
        invoices: body[0].invoices
      })
    })
    .then(data += `${this.state.account}\n`)
    .then(
      this.state.invoices.forEach((invoice) => {
        data += `${invoice.date_received}, ${invoice.amount}\n`
      }),
      console.log(data)
    )
    .then(
      new Dygraph(graphContainer, data, {
        legend: 'always',
        title: `${this.state.account}`
      })
    )
    .catch(error => console.error (`Error in fetch: ${error.message}`))
  }


  render() {
    console.log(this.state);

    return(
      <div className="text-center">
        <div className="overlay">
          <div className="column medium-6 medium-centered text-center graph">
            <div className='graph-instruction'>Click and drag over a specific period of time to examine closer.  Press escape to close the graph.</div>
            <label>Select Account:</label>
            <select onChange={this.createGraphByAccount}>
              <option value='0'>---</option>
              {this.props.accounts}
            </select>
            <div id='graphContainer'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default DyGraph;
