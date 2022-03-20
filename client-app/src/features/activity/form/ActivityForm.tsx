import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { Activity } from '../../../model/Activity';


export default observer(function ActivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity, formClose, createActivity, editActivity, loading} = activityStore;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description:'',
        category:'',
        city: '',
        venue: ''
    } as Activity;

    const [activity, setActivity] = useState(initialState);

   
    function handleOnSubmit()
    {
        activity.id ? editActivity(activity) : createActivity(activity);
    }
    function inputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }
    return(
        <Segment clearing>
            <Form onSubmit={handleOnSubmit}>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={inputChange}></Form.Input>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={inputChange}></Form.TextArea>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={inputChange}></Form.Input>
                <Form.Input placeholder='Date' type='date' name='date' value={activity.date} onChange={inputChange}></Form.Input>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={inputChange}></Form.Input>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={inputChange}></Form.Input>
                <Button loading={loading} floated='right' color='blue' content='Submit' type='submit'></Button>
                <Button onClick={formClose} floated='right' color='grey' content='Cancel' type='button'></Button>
            </Form>
        </Segment>
    )
})