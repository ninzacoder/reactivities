import React from 'react';
import { Button, ButtonGroup, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../model/Activity';

interface Props{
    activity: Activity;
    cancelSelectedActivity: () => void;
}

export default function ActivityDetails({activity, cancelSelectedActivity}: Props){
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
              <Button basic color='blue' content='Edit'></Button>
              <Button basic color='grey' floated='right' content='Cancel' onClick={() => cancelSelectedActivity()}></Button>
          </Button.Group>
        </Card.Content>
      </Card>
    )
}