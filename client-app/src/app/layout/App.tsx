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
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoadingIndicator] = useState(true);
  const [submitted, setSubmitting] = useState(false);

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
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {setActivities([...activities.filter(x=> x.id !== id)]);
    setSubmitting(false);
    })
    
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    setSubmitting(true);
    if (activity.id)
    {
      agent.Activities.edit(activity).then(()=> {
        setActivities([...activities.filter(x=> x.id !== activity.id),activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      }) 
    }
    else
    {     
      activity.id=uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      }) 
    }
  }

  useEffect(() => {
      agent.Activities.list().then(response => {
        let activities = [];
        response.forEach(x=> {
          var activity = x;
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });
        setLoadingIndicator(false);
        setActivities([...activities]);

      }) }, [])

  if (loading) return <LoadingComponent content="Loading..." inverted={true}></LoadingComponent>

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
                              handleDelete={handleDelete}
                              submitted={submitted}></ActivityDashboard>
        </Container> 
    </Fragment>
  );
}

export default App;
