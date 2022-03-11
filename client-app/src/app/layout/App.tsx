import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import {Container, Header, List} from 'semantic-ui-react';
import { Activity } from '../../model/Activity';
import Navbar from '../../features/menu/Navbar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import { act } from 'react-dom/test-utils';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  function handleSelectedActivity(id: string){
    setSelectedActivity(activities.find(x=> x.id === id));
  }

  function handleCancelActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string)
  {
    id? handleSelectedActivity(id): handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose()
  {
    setEditMode(false);
  }

  function handleDelete(id: string)
  {
    setActivities([...activities.filter(x=> x.id !== id)]);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    activity.id ? setActivities([...activities.filter(x=> x.id !== activity.id),activity]) :
    setActivities([...activities, {...activity, id: uuid()}]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  useEffect(() => {
      agent.Activities.list().then(response => {
        let activities = response.forEach(x=> x.date.split('T')[0]);
        setActivities([...response]);

      }) }, [])

  return (
    <Fragment>
      <Navbar openForm={handleFormOpen}/>
        <Container style={{marginTop:'12em'}}> 
           <ActivityDashboard activities={activities} 
                              selectedActivity={selectedActivity} 
                              handleSelectedActivity={handleSelectedActivity} 
                              cancelSelectedActivity={handleCancelActivity}
                              editMode={editMode}
                              formOpen={handleFormOpen}
                              formClose={handleFormClose}
                              handleCreateorEdit={handleCreateOrEditActivity}
                              handleDelete={handleDelete}></ActivityDashboard>
        </Container> 
    </Fragment>
  );
}

export default App;
