import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import usePictureInPicture from 'react-use-pip';
import { PiPIcon, StopPiPIcon } from '../assets/icons';

const MyVideoComponent = (props) => {

    const [ showMyVideoOnPiP, setShowMyVideoOnPiP ] = useState(false);
    const {
        isPictureInPictureActive,
        isPictureInPictureAvailable,
        togglePictureInPicture,
    } = usePictureInPicture(props.videoRef);

    const handleOnClick = () => {
        togglePictureInPicture(!isPictureInPictureActive);
    }

    const pipElement = document.pictureInPictureElement;

    useEffect (() => {
        if(pipElement !== null){
            setShowMyVideoOnPiP(true);
        } else {
            setShowMyVideoOnPiP(false)
        }
    },[pipElement])

    return (
        <React.Fragment>
            {console.log(showMyVideoOnPiP)}
            {
                isPictureInPictureAvailable ?
                <div className="my-video">
                    <video id="ownVideo" ref={props.videoRef} className="ownVideo" autoPlay muted playsInline />
                    <button className='activate-pip'
                        onClick={handleOnClick}

                    >
                        <i className='PiP'>
                            {
                                isPictureInPictureActive ?
                                    <StopPiPIcon /> :
                                    <PiPIcon />
                            }
                        </i>
                        <div className="message">
                            {
                                isPictureInPictureActive ?
                                    <span>Deactivate Picture in Picture</span> :
                                    <span>Activate Picture in Picture</span>
                            }
                        </div>
                    </button>
                </div> :
                <div className="my-video">
                    <video ref={props.videoRef} className="ownVideo" autoPlay muted playsInline></video>
                </div>
            }
        </React.Fragment>
    )
}

export default MyVideoComponent