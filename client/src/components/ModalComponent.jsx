import React from 'react'

const ModalComponent = ( props ) => {
    return (
        <div className="modal-display-place">
            <div className={props.coppiedToClipboard ? "modal-copy-to-clipboard show noselect" : "modal-copy-to-clipboard noselect"}>
                <span>Shareable Link Coppied to Clipboard</span>
            </div>
        </div>
    )
}

export default ModalComponent