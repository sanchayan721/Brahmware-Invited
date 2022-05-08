import React from 'react'
import MyVideoComponent from '../../components/MyVideoComponent';
import VideoComponent from '../../components/VideoComponent';



const VideoContainer = ( props ) => {
  return (
    <div className="video-container">
          <div className="videos">
            {/* <video className="ownVideo" muted ref={props.userVideo} autoPlay playsInline /> */}
            <MyVideoComponent videoRef={props.userVideo} />
            {props.peers.map((peer) => {
              return (
                <VideoComponent class="othersVideo" key={peer.peerID} peer={peer.peer} />
              );
            })}
          </div>
        </div>
  )
}

export default VideoContainer;