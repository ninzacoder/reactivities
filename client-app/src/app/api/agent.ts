import { hasSelectionSupport } from '@testing-library/user-event/dist/utils';
import axios, { AxiosResponse } from 'axios';
import { request } from 'http';
import { Activity } from '../../model/Activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.interceptors.response.use(async s => {
    try {
        await sleep(1000);
        return s;
    } catch (ex) {
        console.log(ex);
        return await Promise.reject(ex);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    handleget: <T> (url: string) => axios.get<T>(url).then(responseBody),
    handlepost: <T> (url: string, body: Activity) => axios.post<T>(url, body).then(response => response.data),
    handleput: <T> (url: string, body: {}) => axios.put<T>(url, body).then(response => response.data),
    handledelete: <T> (url: string) => axios.delete<T>(url).then(response => response.data)
}

 const Activities = {
    list: () => requests.handleget<Activity[]>('/activity'),
    create: (activity: Activity) => requests.handlepost<void>('/activity', activity),
    edit: (activity:Activity) => requests.handleput<void>(`/activity/${activity.id}`, activity),
    delete: (id: string) => requests.handledelete<void>(`/activity/${id}`),
    details: (id: string) => requests.handleget<Activity>(`/activity/${id}`)
}

const agent = {
    Activities
}

export default agent;