import React from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../model/Activity';

export default function ActivityDetails(){

  const {activityStore} = useStore();

  const {selectedActivity: activity, formClose, formOpen} = activityStore;

    return(
        <Card fluid>
        <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className='date'>Joined in {activity.date}</span>
          </Card.Meta>
          <Card.Description>
            {activity.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
              <Button basic color='blue' content='Edit' onClick={() => formOpen(activity.id)}></Button>
              <Button basic color='grey' floated='right' content='Cancel' onClick={formClose}></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}