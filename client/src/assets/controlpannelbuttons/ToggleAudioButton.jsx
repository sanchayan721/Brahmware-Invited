import React from 'react'
import { MicIcon, StopMicIcon } from '../icons'

const ToggleAudioButton = (props) => {
    return (
        <button className={props.isAudio ? 'icon-button stop' : "icon-button"}
            onClick={props.toggleAudio}
        >
            <i className="mic">
                {
                    props.isAudio ?
                        <StopMicIcon /> :
                        <MicIcon />
                }
            </i>
            <div className="message">
                {
                    props.isAudio ?
                        <span>Mute Audio</span> :
                        <span>Unmute Audio</span>
                }
            </div>
        </button>
    )
}

export default ToggleAudioButton