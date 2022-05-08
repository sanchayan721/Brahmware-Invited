import { 
    CREATE_MEETING_SUCCESS,
    CREATE_MEETING_FAILED,
    JOIN_MEETING_SUCCESS,
    JOIN_MEETING_FAILED,
    CONNECTION_ERROR
} from "./types";

import * as API from '../../API';

export const createMeeting = (body, history) => async ( dispatch ) => {
    API.createMeeting(body).then(
        response => {
            if (response.data && response.data.success){
                dispatch({
                    type: CREATE_MEETING_SUCCESS,
                    dataRecieved: response.data
                });
                history.push({
                    pathname: '/room',
                    state: {
                        fromHomePage: true,
                        roomID: response.data.roomID
                    }
                });
            } else {
                dispatch({
                    type: CREATE_MEETING_FAILED,
                    error: response.data.error
                })
            }
        }
    ).catch(
        error => {
            dispatch({
                type: CONNECTION_ERROR,
                error: "No Connection, Please Try Later"
            });
        }
    )
}

export const joinMeeting = ( body, history ) => async ( dispatch ) => {
    API.joinMeeting(body).then(
        response => {
            if (response.data && response.data.success) {
                dispatch({
                    type: JOIN_MEETING_SUCCESS,
                    dataRecieved: response.data,
                    history
                });
                history.push({
                    pathname: '/room',
                    state: {
                        fromHomePage: true,
                        roomID: response.data.roomID
                    }
                });
            } else {
                dispatch({
                    type: JOIN_MEETING_FAILED,
                    error: response.data.error
                })
            }
        }
    ).catch(
        error => {
            dispatch({
                type: CONNECTION_ERROR,
                error: "No Connection, Please Try Later"
            })
        }
    )
}
