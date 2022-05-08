import { combineReducers } from "redux";
import meetingReducer from "./meetingReducer";

export default combineReducers({
    meeting: meetingReducer
})