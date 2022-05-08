import React from 'react'
import { ShareIcon } from '../icons'

const CopyToClipBoardButton = (props) => {
    return (
        <button className='icon-button'
            onClick={props.copyToClipboard}
        >
            <i className="mic">
                <ShareIcon />
            </i>
            <div className="message">
                <span>Copy Invitation Link</span>
            </div>
        </button>
    )
}

export default CopyToClipBoardButton