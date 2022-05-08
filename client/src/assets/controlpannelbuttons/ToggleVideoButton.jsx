import React from 'react'
import { StopVideoIcon, VideoIcon } from '../icons'

const ToggleVideoButton = ( props ) => {
  return (
    <button className={props.isVideo ? 'icon-button stop' : 'icon-button'}
          onClick={props.toggleVideo}
        >
          <i className="video">
            {
              props.isVideo ?
                <StopVideoIcon /> :
                <VideoIcon />
            }
          </i>
          <div className="message">
            {
              props.isVideo ?
                <span>Stop Sharing Video</span> :
                <span>Start Sharing Video</span>
            }
          </div>
        </button>
  )
}

export default ToggleVideoButton