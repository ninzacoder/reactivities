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

function App() {
  const {activityStore} = useStore();
  
  useEffect(() => 
  {
    activityStore.loadActivities();     
  }, [activityStore])

  if (activityStore.loadingInitial) return <LoadingComponent content="Loading..." inverted={true}></LoadingComponent>

  return (
    <Fragment>
      <Navbar />
        <Container style={{marginTop:'12em'}}>
          <ActivityDashboard></ActivityDashboard>
        </Container> 
    </Fragment>
  );
}

export default observer(App);
