import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import paths from './paths';
import Layout from "../components/Layout/Layout"
import Layout_2 from "../components/Layout/Layout_2"
import Layout_3 from "../components/Layout/Layout_3"
import {defaultTemplate} from "../Settings"

const PrivateRoute = ({ path, component: Component }) => {
  const { id} = useSelector(
    state => ({
      id: state.auth.userData.docId
    }),
    shallowEqual
  );


  const dispatch = useDispatch();
  useEffect(() => {
    // var __url_string = window.location.href;
    // var __url = new URL(__url_string);
    // let ref = __url.searchParams.get("ref") ? __url.searchParams.get("ref") : ""

    // console.log(__url)
    
  }, [dispatch]);
  return (
      <Route
        exact
        path={path}
      render={() => (id ? defaultTemplate === "3" ? <Layout_3><Component /></Layout_3> :defaultTemplate === "2" ? <Layout_2><Component /></Layout_2> : <Layout><Component /></Layout> : <Redirect to={paths.ROOT} />)}
      />
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
