import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
// import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import {isMobile} from 'react-device-detect';


import Dashboard_1 from '../pages/Dashboard_3/Dashboard/Dashboard';
import Dashboard_2 from '../pages/Dashboard_3/Dashboard/Dashboard_2';
import Dashboard_3 from '../pages/Dashboard_3/Dashboard/Dashboard_3';
import Discovery from '../pages/Dashboard_3/Discovery/Index';
import Dashboard_mobile_3 from '../pages/Dashboard_3/Dashboard/Mobile';
import Search_3 from '../pages/Dashboard_3/Search/Search';
import Profile_3 from '../pages/Dashboard_3/Profile/Index';
import Profile_Edit_3_1 from '../pages/Dashboard_3/Profile/Edit_1';
import Profile_Edit_3_2 from '../pages/Dashboard_3/Profile/Edit_2';
import Profile_Edit_3_3 from '../pages/Dashboard_3/Profile/Edit_3';
import Settings_3 from '../pages/Dashboard_3/Profile/Settings';
import Match_3 from '../pages/Dashboard_3/Match/Index';
import Favs_3 from '../pages/Dashboard_3/Favs/Index';
import Views from '../pages/Dashboard_3/Views/Index';
import Friends from '../pages/Dashboard_3/Friends/Index';
import Premium_3 from '../pages/Dashboard_3/Premium/Index';
import Step2_3 from '../pages/Dashboard_3/Premium/Step2';
// import Vip_3 from '../Dashboard_3/Vip/Index';
import Vorkasse_3 from '../pages/Dashboard_3/Premium/Vorkasse';

import Verify from '../pages/Verify';
// import Home3 from '../pages/Template_3/Index';
// import Home2 from '../pages/Template_2/Index';
import Home1 from '../pages/Template_1/Index';
import paths from './paths';
import PrivateRoute from './PRoute_3';
// import Modal from "../components/Items/modal"
// import { cleanError } from '../state/actions/auth'
// import { clearUsers } from '../../state/actions/users'
// import { clearDashboard } from '../../state/actions/dashboard'
// import VerifyAlert from "../components/Items/verifyAlert"
import { ToastProvider } from 'react-toast-notifications'
// import {defaultHomeTemplate} from "../Settings"
// import {useIntl} from 'react-intl';

const RouterComponent = () => {
  // const intl = useIntl();
  // const {error } = useSelector(
  //   (state) => ({
  //     // general: state.generalDataReducer.general,
  //     // site: state.generalDataReducer.site,
  //     // length: state.generalDataReducer.length,
  //     error: state.auth.error
  //   }), shallowEqual
  // );
  // const dispatch = useDispatch();
  // useEffect(() => {
    // dispatch(clearDashboard())
    // dispatch(clearUsers())
  // }, []);

  // clearDashboard
  // if (!general || !site || !length){
  //   return null
  // }
  // console.log("mainRender")
  // console.log(error)
  return (
    <BrowserRouter>
      <ToastProvider>
      <Switch>
        <Route path={paths.VERIFY} component={Verify} />
        <PrivateRoute path={paths.DISCOVERY} component={Discovery} />
        <PrivateRoute path={paths.MODIFY_USER} component={Profile_3} />
        <PrivateRoute path={paths.MATCH} component={Match_3} />
        <PrivateRoute path={paths.FAVS} component={Favs_3} />
        <PrivateRoute path={paths.PREMIUM} component={Premium_3} />
        <PrivateRoute path={paths.STEP_2} component={Step2_3} />
        <PrivateRoute path={paths.STEP_3} component={(window.innerWidth < 991) ? Dashboard_mobile_3 : Dashboard_1} />
        {/* <PrivateRoute path={paths.VIP} component={Vip_3} /> */}
        <PrivateRoute path={paths.VORKASSE} component={Vorkasse_3} />
        <PrivateRoute path={paths.PROFILE_EDIT_1} component={Profile_Edit_3_1} />
        <PrivateRoute path={paths.PROFILE_EDIT_2} component={Profile_Edit_3_2} />
        <PrivateRoute path={paths.PROFILE_EDIT_3} component={Profile_Edit_3_3} />
        <PrivateRoute path={paths.SETTINGS} component={Settings_3} />
        <PrivateRoute path={paths.DASHBOARD} component={(window.innerWidth < 991) ? Dashboard_mobile_3 : Dashboard_1} />
        <PrivateRoute path="/online-users" component={Dashboard_3} />
        <PrivateRoute path="/last-users" component={Dashboard_2} />
        <PrivateRoute path={paths.SEARCH} component={Search_3} />
        <PrivateRoute path={paths.VIEWS} component={Views} />
        <PrivateRoute path={paths.FRIENDS} component={Friends} />
        <Route path={paths.ROOT} component={Home1} />
        <Route component={Home1} />
      </Switch>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default RouterComponent;
