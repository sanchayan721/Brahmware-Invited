import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { InformationIcon, TickIcon } from '../../assets/icons';
import { createMeeting } from '../../redux/actions';

const CreateMeeting = () => {

    const [checkboxChecked, setCheckboxChecked] = useState(false);

    const handleCheck = () => {
        if (checkboxChecked) {
            setCheckboxChecked(false);
            setMeetingCreationData(
                {
                    ...meetingCreationData,
                    putOnHub: false
                }
            );
        } else {
            setCheckboxChecked(true);
            setMeetingCreationData(
                {
                    ...meetingCreationData,
                    putOnHub: true
                }
            )
        }
    }

    const [showModal, setShowModal] = useState(false);

    const [meetingCreationData, setMeetingCreationData] = useState({
        meetingName: '',
        userName: '',
        putOnHub: false
    });
    const dispatch = useDispatch();
    const history = useHistory();
    const handleMeetingCreate = async (event) => {
        event.preventDefault();
        dispatch(createMeeting(meetingCreationData, history));
    }

    return (
        <form className='create-meeting' onSubmit={handleMeetingCreate}>
            <div className="meeting-name form-group">
                <input className="form-control" type="text" placeholder="Name of your Meeting"
                    onChange={evnt => setMeetingCreationData({ ...meetingCreationData, meetingName: evnt.target.value })}
                />
            </div>
            <div className="target-name form-group">
                <input type="text" className="form-control" placeholder="Your Name"
                    onChange={evnt => setMeetingCreationData({ ...meetingCreationData, userName: evnt.target.value })}
                />
            </div>
            <div className="button-row noselect">
                <div className="checkbox-part">
                    <div className="checkbox" onClick={handleCheck}>
                        {
                            checkboxChecked && 
                            <i className="tick"><TickIcon/></i>
                        }
                    </div>
                    <div className="checkbox-label">
                        <span>Make it available on Hub</span>
                    </div>
                    <div className="information" onMouseEnter={() => setShowModal(true)} onMouseLeave={() => setShowModal(false)}>
                        <InformationIcon />
                        <div className={ showModal ? "information-modal show" : "information-modal"}>
                            <span> If you select this option, your meeting will be visible in the Hub for others to see and join the meeting from hub. </span>
                        </div>
                    </div>
                </div>
                <div className="button-part">
                    <button type="submit">Create</button>
                </div>
            </div>
        </form>
    )
}

export default CreateMeeting;