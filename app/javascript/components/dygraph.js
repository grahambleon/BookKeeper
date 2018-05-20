import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.css'
// import './graphComponent.css';

class DyGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {


    fetch(`/api/v1/graph`, {
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
        data: body
      })
    })
    // .then(
    //
    //   // new Dygraph(graphContainer, data, {
    //   //   legend: 'always',
    //   //   title: 'Graph'
    //   // })
    // )
    .catch(error => console.error (`Error in fetch: ${error.message}`));
  }





  render() {
    let data;
    data = 'Date'
    this.state.data.forEach((account) => {
      data += `, ${account.company_name}`
    })
    data += '\n'
    this.state.data.forEach((account) => {
      account.invoices.forEach((invoice) => {
        data += `${invoice.date_received}, \n`
      })
    })

    console.log(data);
    return(
      <div className="text-center">
        <div className="overlay">
          <div className="column medium-6 medium-centered text-center graph">
            <div className='graph-instruction'>Click and drag over a specific period of time to examine closer.  Press escape to close the graph.</div>
            <div id='graphContainer'></div>
          </div>
        </div>
      </div>
    )
  }
}

export default DyGraph;
