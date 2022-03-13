import React, { useState } from 'react';
import { Button, Item, Label, List, Segment } from 'semantic-ui-react';
import { Activity } from '../../model/Activity';

interface Props{
    activities: Activity[];
    handleSelectedActivity:(id : string) => void;
    formOpen: (id: string) => void;
    handleDelete:(id: string) => void;
    submitted: boolean;
}

export default function ActivityList({activities, handleSelectedActivity, formOpen, handleDelete, submitted}: Props){
    const [target,setTarget] = useState('');

    function ondelete(e:any, id: string)
    {
        setTarget(e.currentTarget.name);
        handleDelete(id);
    }

    return(
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
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
                            
                            <Button onClick={() => handleSelectedActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                            <Button loading={submitted && target===activity.id} name={activity.id} onClick={(e) => ondelete(e, activity.id)} floated='right' content='Delete' color='red'></Button>
                            <Label basic content={activity.category}></Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}