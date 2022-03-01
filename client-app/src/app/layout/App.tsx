import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import {Container, Header, List} from 'semantic-ui-react';
import { Activity } from '../../model/Activity';
import Navbar from '../../features/menu/Navbar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
      axios.get<Activity[]>('http://localhost:5000/api/activity').then(response=>{
        setActivities(response.data);
      })
  }, [])

  return (
    <Fragment>
      <Navbar />
        <Container style={{marginTop:'12em'}}> 
           <ActivityDashboard activities={activities}></ActivityDashboard>
        </Container> 
    </Fragment>
  );
}

export default App;
