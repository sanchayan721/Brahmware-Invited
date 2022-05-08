import React from 'react'
import BackgroundBlurButton from '../assets/controlpannelbuttons/BackgroundBlurButton'
import CopyToClipBoardButton from '../assets/controlpannelbuttons/CopyToClipBoardButton'
import GroupChatButton from '../assets/controlpannelbuttons/GroupChatButton'
import HangupMeetingButton from '../assets/controlpannelbuttons/HangupMeetingButton'
import ShareScreenButton from '../assets/controlpannelbuttons/ShareScreenButton'
import ToggleAudioButton from '../assets/controlpannelbuttons/ToggleAudioButton'
import ToggleVideoButton from '../assets/controlpannelbuttons/ToggleVideoButton'

const ControlPanel = (props) => {
  return (
    <div className='control-panel'>
      <div className="left">
        <ShareScreenButton isSharingScreen={props.isSharingScreen} toggleShareScreen={props.toggleShareScreen} />
      </div>
      <div className="center">
        <CopyToClipBoardButton copyToClipboard={props.copyToClipboard} />
        <BackgroundBlurButton isBlurApplied={props.isBlurApplied} toggleBackgroundBlur={props.toggleBackgroundBlur} />
        <ToggleAudioButton isAudio={props.isAudio} toggleAudio={props.toggleAudio} />
        <ToggleVideoButton isVideo={props.isVideo} toggleVideo={props.toggleVideo} />
        <HangupMeetingButton hangUp={props.hangUp} />
      </div>
      <div className="right">
        <GroupChatButton />
      </div>
    </div>
  )
}

export default ControlPanel