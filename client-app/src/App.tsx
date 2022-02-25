import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {List} from 'semantic-ui-react';
function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/api/activity').then(response=>{
        console.log(response.data);
        setActivities(response.data);
      })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <List>
          <List.Item>
        {activities.map((activity: any) => (
            <li key={activity.id}>
              {activity.title}
            </li>
          ))}
          </List.Item>
        </List>
      </header>
    </div>
  );
}

export default App;
