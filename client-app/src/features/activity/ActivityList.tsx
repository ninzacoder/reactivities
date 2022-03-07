import React from 'react';
import { Button, Item, Label, List, Segment } from 'semantic-ui-react';
import { Activity } from '../../model/Activity';

interface Props{
    activities: Activity[];
    handleSelectedActivity:(id : string) => void;
}

export default function ActivityList({activities, handleSelectedActivity}: Props){
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
                            <Label basic content={activity.category}></Label>
                        </Item.Extra>
                    </Item.Content>
                </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}