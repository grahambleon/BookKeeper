import React, { Component } from 'react';
import Dygraph from 'dygraphs';
import 'dygraphs/dist/dygraph.css'
// import './graphComponent.css';

class DyGraph extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let data;

    data = 'Data, Point\n'
    data += '1, 1\n'
    data += '2, 2\n'
    data += '3, 3\n'
    data += '4, 4\n'
    data += '5, 5\n'
    data += '6, 6\n'
    data += '7, 7\n'
    data += '8, 8\n'
    data += '9, 9\n'
    data += '10, 1\n'
    data += '11, 1\n'
    data += '12, 2\n'
    data += '13, 3\n'
    data += '14, 4\n'
    data += '15, 5\n'
    data += '16, 6\n'
    data += '17, 7\n'
    data += '18, 8\n'
    data += '19, 9\n'

    new Dygraph(graphContainer, data, {
      legend: 'always',
      title: 'Graph'
    });
  }

  render() {
    return(
      <div id='graphContainer'></div>
    )
  }
}

export default DyGraph;
