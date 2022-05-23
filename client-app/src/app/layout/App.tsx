import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import { Container} from 'semantic-ui-react';
import Navbar from '../../features/menu/Navbar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityDetails from '../../features/activity/details/ActivityDetails';
import ActivityForm from '../../features/activity/form/ActivityForm';

function App() {

  const location = useLocation();

  return (
    <Fragment>
      <Route exact path='/' component={HomePage}></Route>
      <Route path={'/(.+)'} render={() => (
        <>
        <Navbar />
        <Container style={{marginTop:'12em'}}>
          
          <Route exact path='/activities' component={ActivityDashboard}></Route>
          <Route exact path='/activities/:id' component={ActivityDetails}></Route>
          <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm}></Route>
        </Container> 
        </>
      )
      }/>
      
    </Fragment>
  );
}

export default observer(App);
