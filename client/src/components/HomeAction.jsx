import React, { useState } from 'react';
import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import CreateMeeting from '../containers/createMeeting';
import JoinMeeting from '../containers/joinMeeting';

const HomeAction = () => {
    const [activeTab, setActiveTab] = useState('create_meeting');
    const [ invitationCode, setInvitationCode ] = useState('');

    const location = useLocation();
    useEffect(() => {
        if(location.hash) {
            setActiveTab('join_meeting');
            setInvitationCode(location.hash.replace(/^(#)/,""));
        }
    }, [])
    const store = useStore();
    const [error, setError] = useState('');

    store.subscribe(() => {
        const meeting = store.getState().meeting;
        meeting.error && errorShow(meeting.error, 5000);
    });

    const errorShow = ( error, showTime ) => {
        setError(error);
        const errorDisappear = () => setError('');
        setTimeout(
            errorDisappear,
            showTime
        );
    }

    return (
        <div className="section-action">
            <div className="tab-names noselect">
                <div className={activeTab === "create_meeting" ? "create_meeting active" : "create_meeting inactive"} onClick={() => setActiveTab('create_meeting')}>
                    <span className="title">Create Meeting</span>
                </div>
                <div className={activeTab === "join_meeting" ? "join_meeting active" : "join_meeting inactive"} onClick={() => setActiveTab('join_meeting')}>
                    <span className="title">Join a Meeting</span>
                </div>
            </div>
            <div className="error-display-area">
                {
                    error &&
                    <div className="error">
                        <span>{error}</span>
                    </div>
                }
            </div>
            <div className="active-content">
                {
                    activeTab === 'create_meeting' ?
                        <CreateMeeting /> :
                        <JoinMeeting invitationCode={invitationCode}/>
                }
            </div>
        </div>
    )
}

export default HomeAction