import React from 'react';
import { Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from "../components/Layout/Index"

const PrivateRoute = ({ path, component: Component }) => {
  return (
      <Route
        exact
        path={path}
      render={() => (<Layout><Component /></Layout>)}
      />
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
