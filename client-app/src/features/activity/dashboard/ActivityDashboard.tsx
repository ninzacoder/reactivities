import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../model/Activity';
import ActivityList from '../ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';



export default observer (function ActivityDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    useEffect(() => 
    {
      activityStore.loadActivities();     
    }, [activityStore])
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Loading..." inverted={true}></LoadingComponent>
  
    return(
        <Grid>
            <Grid.Column width='10'>
                <ActivityList></ActivityList>
          </Grid.Column>
          <Grid.Column width='6'>
              {selectedActivity && !editMode && <ActivityDetails></ActivityDetails>}
                              {editMode && <ActivityForm ></ActivityForm>}
          </Grid.Column>
          </Grid>
    )
})
