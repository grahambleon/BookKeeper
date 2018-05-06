import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';
import HomePage from '../containers/HomePage';

const Routes = (props) => {
  return (
    <Router history={browserHistory}>
      <Route path='/' component={HomePage} />
    </Router>
  );
}
export default Routes;
