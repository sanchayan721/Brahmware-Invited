import axios from 'axios';
import serverLocation from './config';

const API = axios.create(
    {   
        baseURL: serverLocation 
    }
);

const config = {
    headers: {
        "Accept": 'application/json',
        "Content-type": "application/json"
    }

};


export const createMeeting = async (body) => API.post('/meeting/createmeeting', body, config);
export const joinMeeting = async (body) => API.post('/meeting/joinmeeting', body, config);