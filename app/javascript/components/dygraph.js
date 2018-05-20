import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.css'

class DyGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      invoices: []
    }
    this.fetchGraphData = this.fetchGraphData.bind(this)
    this.renderGraph = this.renderGraph.bind(this)
  }

  fetchGraphData(event) {
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
    .catch(error => console.error (`Error in fetch: ${error.message}`))
  }

  renderGraph() {
    let data;
    data = 'Date, $\n'
    this.state.invoices.forEach((invoice) => {
        data += `${invoice.date_received}, ${invoice.amount}\n`
    }),
    new Dygraph(graphContainer, data, {
      title: `${this.state.account}`
    })
  }

  render() {
    return(
      <div className="overlay">
        <div className="column medium-6 medium-centered text-center graph">
          <div className='graph-instruction'>Click and drag over a specific period of time to examine closer.  Press escape to close the graph.</div>
          <label>Select Account:</label>
          <select onChange={this.fetchGraphData}>
            <option value='0'>---</option>
            {this.props.accounts}
          </select>
          <button onClick={this.renderGraph}>VISUALIZE!!!! =D</button>
          <div id='graphContainer'></div>
        </div>
      </div>
    )
  }
}

export default DyGraph;
