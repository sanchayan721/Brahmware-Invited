import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { joinMeeting } from '../../redux/actions';

const JoinMeeting = (props) => {
    const [meetingJoinData, setMeetingJoinData] = useState({
        invitationCode: props.invitationCode ? props.invitationCode : '',
        userName: ''
    });
    const dispatch = useDispatch();
    const history = useHistory();

    const handleMeetingJoin = async (event) => {
        event.preventDefault();
        dispatch(joinMeeting(meetingJoinData, history));
    }
    
    return (
        <form className='join-meeting' onSubmit={handleMeetingJoin}>
            <div className="invitation-code form-group">
                <input className="form-control" type="text" placeholder="Invitation Code"
                    value={meetingJoinData.invitationCode && meetingJoinData.invitationCode}
                    onChange={evnt => setMeetingJoinData({ ...meetingJoinData, invitationCode: evnt.target.value })}
                />
            </div>
            <div className="target-name form-group">
                <input type="text" className="form-control" placeholder="Your Name"
                    onChange={evnt => setMeetingJoinData({ ...meetingJoinData, userName: evnt.target.value })}
                />
            </div>
            <div className="button-row noselect">
                <div className="button-part">
                    <button type="submit">Join</button>
                </div>
            </div>
        </form>
    )
}

export default JoinMeeting;