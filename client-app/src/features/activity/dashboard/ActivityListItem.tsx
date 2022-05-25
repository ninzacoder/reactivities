import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../model/Activity";

interface Props{
    activity: Activity
}

export default function ActivityListItem({activity}:Props){
    const [target,setTarget] = useState('');
    const {activityStore} = useStore();
    const {loading, activitiesByDate, deleteActivity} = activityStore;
    function ondelete(e:any, id: string)
    {
        setTarget(e.currentTarget.name);
        deleteActivity(id);
    }


    return(
       
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size='tiny' circular src='/assets/user.png' ></Item.Image>
                            <Item.Content>
                                <Item.Header as={Link} to={`/activities/${activity.id}`}>{activity.title}</Item.Header>
                                <Item.Description>Hosted by Bob</Item.Description>
                            </Item.Content>
                            
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                    <span>
                        <Icon name='clock'></Icon>{activity.date}
                        <Icon name='marker'></Icon>{activity.venue}
                    </span>
                </Segment>
                <Segment secondary>
                    Attendees go here
                </Segment>
                <Segment clearing>
                    <span>{activity.description}</span>
                    <Button as={Link} to={`/activities/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'/>
                </Segment>
            </Segment.Group>

    )
}