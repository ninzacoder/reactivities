import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import { Container} from 'semantic-ui-react';
import { Activity } from '../../model/Activity';
import Navbar from '../../features/menu/Navbar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activity/details/ActivityDetails';
import ActivityForm from '../../features/activity/form/ActivityForm';

function App() {

  return (
    <Fragment>
      <Navbar />
        <Container style={{marginTop:'12em'}}>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/activities" component={ActivityDashboard}></Route>
          <Route exact path="/createActivity" component={ActivityForm}></Route>
          <Route exact path="/activities/:id" component={ActivityDetails}></Route>

      {/* <ActivityDashboard></ActivityDashboard> */}
        </Container> 
    </Fragment>
  );
}

export default observer(App);
