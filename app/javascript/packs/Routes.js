import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import HomePage from '../containers/home-page';
import InvoiceFormContainer from '../containers/invoice-form-container';

const Routes = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
      <Route path='/invoices/new' component={InvoiceFormContainer} />
    </Router>
  );
}
export default Routes;
