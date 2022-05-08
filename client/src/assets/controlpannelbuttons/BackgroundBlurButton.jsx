import React from 'react'
import { BlurIcon, StopBlurIcon } from '../icons'

const BackgroundBlurButton = (props) => {
    return (
        <button className={props.isBlurApplied ? 'icon-button stop' : "icon-button"}
            onClick={props.toggleBackgroundBlur}
        >
            <i className="blur">
                {
                    props.isBlurApplied ?
                    <StopBlurIcon /> :
                    <BlurIcon />
                }
            </i>
            <div className="message">
                {
                    props.isBlurApplied ?
                    <span>Remove Background Blur</span> :
                    <span>Apply Background Blur</span>
                }
            </div>
        </button>
    )
}

export default BackgroundBlurButton