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
    editMode: boolean;
    formOpen:(id: string) => void;
    formClose:() => void;
    handleCreateorEdit: (activity: Activity) => void;
    handleDelete:(id: string) => void;
}

export default function ActivityDashboard({activities, handleSelectedActivity, selectedActivity, cancelSelectedActivity, formOpen, formClose, editMode, handleCreateorEdit, handleDelete}: Props){
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                            handleSelectedActivity={handleSelectedActivity}
                            formOpen={formOpen}
                            handleDelete={handleDelete}
                            ></ActivityList>
          </Grid.Column>
          <Grid.Column width='6'>
              {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity} formClose={formClose} formOpen={formOpen}></ActivityDetails>}
                              {editMode && <ActivityForm formClose={formClose} activity={selectedActivity} handleCreateorEdit={handleCreateorEdit}></ActivityForm>}
          </Grid.Column>
          </Grid>
    )
}
