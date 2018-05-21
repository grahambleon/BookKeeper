import React from 'react';
import DyGraph from '../components/dygraph'

class Graph extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
    this.showGraph = this.showGraph.bind(this)
    this.hideGraph = this.hideGraph.bind(this)
  }

  showGraph() {
    if (this.state.selected == false) {
      this.setState ({ selected: true })
    }
  }

  hideGraph() {
    if (event.keyCode == 27) {
    this.setState ({ selected: false })
    }
  }

  componentDidMount(){
     document.addEventListener("keydown", this.hideGraph, false);
   }
   componentWillUnmount(){
     document.removeEventListener("keydown", this.hide, false);
   }

  render() {
    let overlay;
    if(this.state.selected == true) {
      overlay = <DyGraph hideGraph={this.hideGraph} accounts={this.props.accounts}/>
    }else if (this.state.selected == false) {
      overlay = <div></div>
    }

    return (
      <div onClick={this.showGraph}>
        <div className='visualize-button'>Account Graph</div>
        <div>
          {overlay}
        </div>
      </div>
    )
  }
}

export default Graph;
