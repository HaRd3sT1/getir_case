import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
// import {isMobile} from 'react-device-detect';


import Dashboard from '../Dashboard_1/Search/Index';
import Profile from '../Dashboard_1/Profile/Index';
import Messages from '../Dashboard_1/Messages/Index';
import Match from '../Dashboard_1/Match/Index';
import Favs from '../Dashboard_1/Favs/Index';
import Premium from '../Dashboard_1/Premium/Index';
import Step2 from '../Dashboard_1/Premium/Step2';
import Step3 from '../Dashboard_1/Premium/Step3';
import Vip from '../Dashboard_1/Vip/Index';

import Verify from '../Verify';
import Home from '../Template_1/Index';
import paths from './paths';
import PrivateRoute from './PrivateRoute';
import Modal from "../../components/Items/modal"
import { cleanError } from '../../state/actions/auth'
import VerifyAlert from "../../components/Items/verifyAlert"
import { ToastProvider } from 'react-toast-notifications'
import {defaultTemplate} from "../../Settings"

const RouterComponent = () => {
  const { general, error, site, length } = useSelector(
    (state) => ({
      general: state.generalDataReducer.general,
      site: state.generalDataReducer.site,
      length: state.generalDataReducer.length,
      error: state.auth.error
    }), shallowEqual
  );
  const dispatch = useDispatch();
  if (!general || !site || !length){
    return null
  }
  if(defaultTemplate){
    general.template = defaultTemplate
  }
  return (
    <BrowserRouter>
      <ToastProvider>
      {error === "Du hast es fast geschafft!" ?
        <Modal title={error} content={<VerifyAlert close={(e) => dispatch(cleanError())} />} status={error} width={500} close={(e) => dispatch(cleanError())} />
        : <Modal title="Error" content={error} status={error} width={400} close={(e) => dispatch(cleanError())} />
      }
      {/* {defaultTemplate ? 
      <Switch>
        <Route path={paths.VERIFY} component={Verify} />
        <PrivateRoute path={paths.MODIFY_USER} component={general.template === "2" ? Profile_2 : Profile} />
        <PrivateRoute path={paths.MESSAGES} component={general.template === "2" ? Messages_2 : Messages} />
        <PrivateRoute path={paths.MATCH} component={general.template === "2" ? Match_2 : Match} />
        <PrivateRoute path={paths.FAVS} component={general.template === "2" ? Favs_2 : Favs} />
        <PrivateRoute path={paths.PREMIUM} component={general.template === "2" ? Premium_2 : Premium} />
        <PrivateRoute path={paths.STEP_2} component={general.template === "2" ? Step2_2 : Step2} />
        <PrivateRoute path={paths.STEP_3} component={general.template === "2" ? Dashboard_2 : Step3} />
        <PrivateRoute path={paths.VIP} component={general.template === "2" ? Vip_2 : Vip} />
        {general.template === "2" ?<PrivateRoute path={paths.VORKASSE} component={Vorkasse} /> : ""}
        {general.template === "2" ?<PrivateRoute path={paths.PROFILE_EDIT_1} component={Profile_Edit_1} /> : ""}
        {general.template === "2" ?<PrivateRoute path={paths.PROFILE_EDIT_2} component={Profile_Edit_2} /> : ""}
        {general.template === "2" ?<PrivateRoute path={paths.PROFILE_EDIT_3} component={Profile_Edit_3} /> : ""}
        {general.template === "2" ?<PrivateRoute path={paths.SETTINGS} component={Settings} /> : ""}
        <PrivateRoute path={paths.DASHBOARD} component={general.template === "2" ? Dashboard_2 : Dashboard} />
        <PrivateRoute path={paths.SEARCH} component={general.template === "2" ? Search_2 : ""} />
        <Route path={paths.ROOT} component={defaultTemplate === "1" ? Home : defaultTemplate === "2" ? Home2 : defaultTemplate === "3" ? Home3 : Home} />
        <Route component={defaultTemplate === "1" ? Home : defaultTemplate === "2" ? Home2 : defaultTemplate === "3" ? Home3 : Home} />
      </Switch> :  */}
      
      <Switch>
        <Route path={paths.VERIFY} component={Verify} />
        <PrivateRoute path={paths.MODIFY_USER} component={Profile} />
        <PrivateRoute path={paths.MESSAGES} component={Messages} />
        <PrivateRoute path={paths.MATCH} component={Match} />
        <PrivateRoute path={paths.FAVS} component={Favs} />
        <PrivateRoute path={paths.PREMIUM} component={Premium} />
        <PrivateRoute path={paths.STEP_2} component={Step2} />
        <PrivateRoute path={paths.STEP_3} component={Step3} />
        <PrivateRoute path={paths.VIP} component={Vip} />
        <PrivateRoute path={paths.DASHBOARD} component={Dashboard} />
        <Route path={paths.ROOT} component={Home} />
      </Switch>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default RouterComponent;
