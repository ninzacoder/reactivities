import axios from 'axios';
import { Activity } from '../../model/Activity';

axios.defaults.baseURL = 'http://localhost:5000/api';

const requests = {
    handleget: <T> (url: string) => axios.get<T>(url).then(response => response.data),
    handlepost: <T> (url: string, body: {}) => axios.post<T>(url, body).then(response => response.data),
    handleput: <T> (url: string, body: {}) => axios.put<T>(url, body).then(response => response.data),
    handledelete: <T> (url: string) => axios.get<T>(url).then(response => response.data)
}

 const Activities = {
    list: () => requests.handleget<Activity[]>('/activity')
}

const agent = {
    Activities
}

export default agent;