import { observer } from 'mobx-react-lite';
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer (function ActivityList(){
    const [target,setTarget] = useState('');
    const {activityStore} = useStore();
    const {loading, activitiesByDate, deleteActivity} = activityStore;
    
    function ondelete(e:any, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return(
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                <Item key={activity.id}>
                    <Item.Content>
                        <Item.Header as='a'>{activity.title}
                        </Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.description}</div>
                            <div>{activity.city}, {activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                            
                            <Button as={Link} to={`/activities/${activity.id}`}  floated='right' content='View' color='blue'></Button>
                            <Button loading={loading && target===activity.id} name={activity.id} onClick={(e) => ondelete(e, activity.id)} floated='right' content='Delete' color='red'></Button>
                            <Label basic content={activity.category}></Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})