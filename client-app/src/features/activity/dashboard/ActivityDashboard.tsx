import React from 'react';
import { Grid, List } from 'semantic-ui-react';
import { Activity } from '../../../model/Activity';
import ActivityList from '../ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';

interface Props{
    activities: Activity[];
    selectedActivity: Activity | undefined;
    handleSelectedActivity: (id: string) => void;
    cancelSelectedActivity: () => void;
}

export default function ActivityDashboard({activities, handleSelectedActivity, selectedActivity, cancelSelectedActivity}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} handleSelectedActivity={handleSelectedActivity}></ActivityList>
          </Grid.Column>
          <Grid.Column width='6'>
              {selectedActivity && <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity}></ActivityDetails>}
              <ActivityForm></ActivityForm>
          </Grid.Column>
          </Grid>
    )
}
