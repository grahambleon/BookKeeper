import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.css'
// import './graphComponent.css';

class DyGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let data = this.props.data;

    new Dygraph(graphContainer, data, {
      legend: 'always',
      title: 'Graph'
    });
  }

  render() {
    return(
      <div className='overlay'>
        <div className='graph-instruction'>Click and drag over a specific period of time to examine closer.  Press escape to close the graph.</div>
        <div id='graphContainer'></div>
      </div>
    )
  }
}

export default DyGraph;
