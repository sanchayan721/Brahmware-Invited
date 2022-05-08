import React, { useRef, useEffect } from "react";
/* Stream Video of the user */
const VideoComponent = (props) => {
  const videoRef = useRef();

  useEffect(() => {
    props.peer.on("stream", async (stream) => {
      videoRef.current.srcObject = stream;
    })
  }, []);

  return (
    <video className="groupVideo" playsInline autoPlay ref={videoRef}/>
  )
}

export default VideoComponent;