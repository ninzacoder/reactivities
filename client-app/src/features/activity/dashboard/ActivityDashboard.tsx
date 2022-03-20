import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../model/Activity';
import ActivityList from '../ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityForm';



export default observer (function ActivityDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;
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
