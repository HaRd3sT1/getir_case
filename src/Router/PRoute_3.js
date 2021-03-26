import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import paths from './paths';
import Layout3 from "../components/Layout/Layout_3"
// import {defaultTemplate} from "../../Settings"

const PrivateRoute = ({ path, component: Component }) => {
  const { id} = useSelector(
    state => ({
      id: state.auth.userData.docId
    }),
    shallowEqual
  );

    // console.log("route")
  // const dispatch = useDispatch();
  // useEffect(() => {
    // var __url_string = window.location.href;
    // var __url = new URL(__url_string);
    // let ref = __url.searchParams.get("ref") ? __url.searchParams.get("ref") : ""

    // console.log(__url)
    
  // }, [dispatch]);
  return (
      <Route
        exact
        path={path}
      render={() => (id ? <Layout3><Component /></Layout3> : <Redirect to={paths.ROOT} />)}
      />
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
