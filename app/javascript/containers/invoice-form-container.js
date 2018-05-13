import React from 'react';

class InvoiceFormContainer extends React.Component {
  constructor(props) {
    super(props)
    // this.state{}
  }

  handleChange(event) {
    this.setState({
      event.target.name: event.target.value
    })
  }

  render() {
    return(

    )
  }
}

export default InvoiceFormContainer;
