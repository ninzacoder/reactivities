import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { act } from 'react-dom/test-utils';


export default observer(function ActivityForm(){

    const {activityStore} = useStore();
    const {selectedActivity, createActivity, editActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{id: string}>();
    const history = useHistory();

    const [activity, setActivity] = useState({id: '',
                                                title: '',
                                                date: '',
                                                description:'',
                                                category:'',
                                                city: '',
                                                venue: ''
                                            });

    useEffect(()=> {
            if (id) loadActivity(id).then(activity => setActivity(activity))
    }, [id, loadActivity]);
   
    function handleOnSubmit()
    {
        if (activity.id.length === 0)
        {
            let newActivity = {...activity, id: uuid()}
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        }
        else
        {
            editActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        } 
        
    }
    function inputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    if (loadingInitial) return <LoadingComponent content='Loading.....'></LoadingComponent>

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
                <Button floated='right' color='grey' content='Cancel' type='button' as={Link} to='/activities'></Button>
            </Form>
        </Segment>
    )
})