import React from 'react';
import { ScreenShareIcon, StopScreenShareIcon } from '../icons';

const ShareScreenButton = ( props ) => {
  return (
    <button className={props.isSharingScreen ? "icon-button stop" : "icon-button"}
          onClick={props.toggleShareScreen}
        >
          <i className="screen-share">{
            props.isSharingScreen ?
              <StopScreenShareIcon /> :
              <ScreenShareIcon />
          }</i>
          <div className="message">
            {
              props.isSharingScreen ?
                <span>Stop Sharing Screen</span> :
                <span>Start Sharing Screen</span>
            }
          </div>
        </button>
  )
}

export default ShareScreenButton