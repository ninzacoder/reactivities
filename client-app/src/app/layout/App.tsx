import React, {useState, useEffect, Fragment} from 'react';
import './styles.css';
import axios from 'axios';
import {Container, Header, List} from 'semantic-ui-react';
import { Activity } from '../../model/Activity';
import Navbar from '../../features/menu/Navbar';
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
        <Container> 
           <List>
              {activities.map((activity) => (
                <List.Item key={activity.id}>
                    
                                {activity.title}
                                </List.Item>  
                ))}
          </List>
        </Container> 
    </Fragment>
  );
}

export default App;
