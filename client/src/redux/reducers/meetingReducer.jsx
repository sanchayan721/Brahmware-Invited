import { 
    CREATE_MEETING_SUCCESS,
    CREATE_MEETING_FAILED,
    JOIN_MEETING_SUCCESS,
    JOIN_MEETING_FAILED,
    CONNECTION_ERROR,
    MOVE_TO_ROOM
} from "../actions/types";

const initialState = {
    roomID: null,
    meetingName: null,
    inMeetingRoom: false,
    error: null
}

const meetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_MEETING_SUCCESS:
            return {
                ...state,
                roomID: action.dataRecieved.roomID,
                meetingName: action.dataRecieved.meetingName,
                inMeetingRoom: false,
                error: null
            }
        
        case CREATE_MEETING_FAILED:
            return {
                ...state,
                roomID: null,
                meetingName: null,
                inMeetingRoom: false,
                error: action.error
            }
    
        case JOIN_MEETING_SUCCESS:
            return {
                ...state,
                roomID: action.dataRecieved.roomID,
                meetingName: action.dataRecieved.meetingName,
                inMeetingRoom: false,
                error: null
            }
        
        case JOIN_MEETING_FAILED:
            return {
                ...state,
                roomID: null,
                meetingName: null,
                inMeetingRoom: false,
                error: action.error
            }
        
        case CONNECTION_ERROR: 
            return {
                ...state,
                roomID: null,
                meetingName: null,
                inMeetingRoom: false,
                error: action.error
            }
        
        case MOVE_TO_ROOM:
            return {
                ...state,
                inMeetingRoom: true
            }

        default:
            return state;
    }
}

export default meetingReducer;