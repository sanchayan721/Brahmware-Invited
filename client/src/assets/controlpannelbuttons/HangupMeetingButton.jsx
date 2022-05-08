import React from 'react'
import { EndIcon } from '../icons'

const HangupMeetingButton = (props) => {
    return (
        <button className='icon-button stop'
            onClick={props.hangUp}
        >
            <i className="end">
                <EndIcon />
            </i>
            <div className="message">
                <span>Leave Meeting</span>
            </div>
        </button>
    )
}

export default HangupMeetingButton