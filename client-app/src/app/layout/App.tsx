import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import {Container, Header, List} from 'semantic-ui-react';
import { Activity } from '../../model/Activity';
import Navbar from '../../features/menu/Navbar';
import ActivityDashboard from '../../features/activity/dashboard/ActivityDashboard';
import { act } from 'react-dom/test-utils';
import {v4 as uuid} from 'uuid';
import { randomUUID } from 'crypto';
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
      axios.get<Activity[]>('http://localhost:5000/api/activity').then(response=>{
        setActivities(response.data);
      })
  }, [])

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
