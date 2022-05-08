import React from 'react'
import { GroupChatIcon } from '../icons'

const GroupChatButton = ( props ) => {
    return (
        <button className="icon-button" >
            <i className="group-chat">
                <GroupChatIcon />
            </i>
            <div className="message">
                <span>Open Conversation Tab</span>
            </div>
        </button>
    )
}

export default GroupChatButton