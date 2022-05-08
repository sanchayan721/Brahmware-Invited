import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useHistory } from "react-router-dom";
import ControlPanel from "../components/ControlPanel";
import { useStore } from "react-redux";
import SEO from "../components/SEO";
import { BodyPixReactView } from "body-pix-react-render";
import VideoContainer from "../containers/videocontainer";
import ModalComponent from "../components/ModalComponent";

const MeetingRoom = (props) => {
  const history = useHistory();

  // variables for different functionalities of video call
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const userStream = useRef();
  const bluredVideoStreamRef = useRef();
  const screenShareStream = useRef();
  const [roomID, setRoomID] = useState();
  const store = useStore();

  const [meetingName, setMeetingName] = useState('');

  const [isBlurApplied, setBlurApplied] = useState(false);
  const [audioFlag, setAudioFlag] = useState(true);
  const [videoFlag, setVideoFlag] = useState(true);
  const [userUpdate, setUserUpdate] = useState([]);
  const [coppiedToClipboard, setCoppiedToClipboard] = useState(false);
  const [screenShareFlag, setScreenShareFlag] = useState(false);

  const videoConstraints = {
    minAspectRatio: 1.333,
    minFrameRate: 60,
    height: window.innerHeight / 1.8,
    width: window.innerWidth / 2,
  };

  useEffect(() => {

    // setting Room ID
    setRoomID(props.location.state.roomID);
    // setting up the meeting name
    setMeetingName(store.getState().meeting.meetingName);

    // socket.io connection
    socketRef.current = io.connect("/");

    // asking for audio and video access
    navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {

      // streaming the audio and video
      userVideo.current.srcObject = stream;
      userStream.current = stream;

      socketRef.current.emit("join room group", roomID);

      // getting all user for the new user joining in
      socketRef.current.on("all users", users => {
        const peers = [];

        // adding the new user to the group
        users.forEach(userID => {
          const peer = createPeer(userID, socketRef.current.id, stream);
          peersRef.current.push({
            peerID: userID,
            peer,
          })
          peers.push({
            peerID: userID,
            peer,
          });
        })
        setPeers(peers);
      })

      // sending signal to existing users after new user joined
      socketRef.current.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({
          peerID: payload.callerID,
          peer,
        })

        const peerObj = {
          peer,
          peerID: payload.callerID
        }
        setPeers(users => [...users, peerObj]);
      });

      // exisisting users recieving the signal
      socketRef.current.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item.peer.signal(payload.signal);
      });

      socketRef.current.on("change", (payload) => {
        setUserUpdate(payload);
      });

      // handling user disconnecting
      socketRef.current.on("user left", id => {
        // finding the id of the peer who just left
        const peerObj = peersRef.current.find(p => p.peerID === id);
        if (peerObj) {
          peerObj.peer.destroy();
        }

        // removing the peer from the arrays and storing remaining peers in new array
        const peers = peersRef.current.filter(p => p.peerID !== id);
        peersRef.current = peers;
        setPeers(peers);
      })
    })
  }, [])


  // creating a peer object for newly joined user
  const createPeer = (userToSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", signal => {
      socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
    })

    return peer;
  }

  // adding the newly joined peer to the room
  const addPeer = (incomingSignal, callerID, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on("signal", signal => {
      socketRef.current.emit("returning signal", { signal, callerID })
    })

    peer.signal(incomingSignal);
    return peer;
  }

  // Sharing the Screen
  const toggleShareScreen = () => {
    if (!screenShareFlag) {
      // asking for the display media along with the cursor movement of the user sharing the screen
      navigator.mediaDevices.getDisplayMedia({ cursor: true, video: videoConstraints }).then(stream => {
        const screenTrack = stream.getVideoTracks()[0];
        screenShareStream.current = screenTrack;
        const userTrack = userStream.current.getVideoTracks()[0];

        // setting the screen Share Flag to true
        setScreenShareFlag(true);
        peersRef.current.forEach((peerRef) => {
          peerRef.peer.replaceTrack(userTrack, screenTrack, userStream.current);
        });

        // when the screenshare is turned off, replace the displayed screen with the video of the user
        screenTrack.onended = () => {

          // setting Screen share Flag to False
          setScreenShareFlag(false);
          peersRef.current.forEach((peerRef) => {
            peerRef.peer.replaceTrack(screenTrack, userTrack, userStream.current);
          })
        }
      });
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {
        const videoTrack = stream.getVideoTracks()[0];
        const userTrack = userStream.current.getVideoTracks()[0];
        peersRef.current.forEach((peerRef) => {
          peerRef.peer.replaceTrack(userTrack, videoTrack, userStream.current);
        });
        setScreenShareFlag(false);
        screenShareStream.current.stop();
      })
    }
  }

  // Apply Background Blur
  const options = {
    //your custom options
    algorithm: 'person',
    estimate: 'segmentation',
    flipHorizontal: false,
    maskType: "room",
    showFps: false,
    mediaOptions: {
      audio: false
    },
    segmentation: {
      segmentationThreshold: 0.7,
      effect: 'bokeh',
      maskBackground: true,
      opacity: 0.98,
      backgroundBlurAmount: 10,
      maskBlurAmount: 0,
      edgeBlurAmount: 10
    }
  }


  const toggleBackgroundBlur = () => {
    if (isBlurApplied) {
      setBlurApplied(false);
      const dgCollection = document.getElementsByClassName("dg");
      dgCollection[0] && dgCollection[0].remove();
      navigator.mediaDevices.getUserMedia({ audio: true, video: videoConstraints }).then(stream => {
        userVideo.current.srcObject = stream;
      })
    } else {
      setBlurApplied(true);
      userVideo.current.srcObject = bluredVideoStreamRef.current
    }
  }


  const onEvent = (event) => {
    if (event.event === "READY") {
      userVideo.current.srcObject = event.stream;
      bluredVideoStreamRef.current = event.stream;

      // Sending it to all peers
      peersRef.current.forEach((peerRef) => {
        const blurredUserTrack = event.stream.getVideoTracks()[0];
        const userTrack = userStream.current.getVideoTracks()[0];
        peerRef.peer.replaceTrack(userTrack, blurredUserTrack, userStream.current);
      })
    }
  }

  // Toggle Video
  const toggleVideo = () => {
    if (userVideo.current.srcObject) {
      userVideo.current.srcObject.getTracks().forEach(function (track) {
        if (track.kind === "video") {
          if (track.enabled) {
            socketRef.current.emit("change", [...userUpdate, {
              id: socketRef.current.id,
              videoFlag: false,
              audioFlag,
            }]);
            track.enabled = false;
            setVideoFlag(false);
          } else {
            socketRef.current.emit("change", [...userUpdate, {
              id: socketRef.current.id,
              videoFlag: true,
              audioFlag,
            }]);
            track.enabled = true;
            setVideoFlag(true);
          }
        }
      });
    }
  }

  // Toggle Audio
  const toggleAudio = () => {
    if (userVideo.current.srcObject) {
      userVideo.current.srcObject.getTracks().forEach(function (track) {
        if (track.kind === "audio") {
          if (track.enabled) {
            socketRef.current.emit("change", [...userUpdate, {
              id: socketRef.current.id,
              videoFlag,
              audioFlag: false,
            }]);
            track.enabled = false;
            setAudioFlag(false);
          } else {
            socketRef.current.emit("change", [...userUpdate, {
              id: socketRef.current.id,
              videoFlag,
              audioFlag: true,
            }]);
            track.enabled = true;
            setAudioFlag(true);
          }
        }
      });
    }
  }

  // Copy to Clipboard
  const copyToClipboard = () => {
    const clip = `http://localhost:3000#${roomID}`;

    const showCoppied = (duration) => {
      setCoppiedToClipboard(true);
      const showCoppiedDisappear = () => setCoppiedToClipboard(false);
      setTimeout(
        showCoppiedDisappear,
        duration
      );
    }
    navigator.clipboard.writeText(clip).then(function () {
      /* clipboard successfully set */
      showCoppied(5000);
    }, function () {
      /* clipboard write failed */
    });
  }

  // Hanging up the call
  const hangUp = () => {
    userStream.current.getVideoTracks()[0].enabled = false;
    history.push("/");
    window.location.reload();
  }

  return (
    <React.Fragment>
      <SEO title={meetingName}></SEO>
      <BodyPixReactView options={options} visible={!isBlurApplied} start={isBlurApplied} onEvent={onEvent} />
      <div className="meeting-room-wrapper">
        <VideoContainer userVideo={userVideo} peers={peers}/>
        <ModalComponent coppiedToClipboard={coppiedToClipboard}/>
        <ControlPanel
          toggleShareScreen={toggleShareScreen}
          isSharingScreen={screenShareFlag}
          toggleBackgroundBlur={toggleBackgroundBlur}
          isBlurApplied={isBlurApplied}
          toggleAudio={toggleAudio}
          isAudio={audioFlag}
          hangUp={hangUp}
          copyToClipboard={copyToClipboard}
          toggleVideo={toggleVideo}
          isVideo={videoFlag}
        />
      </div>
    </React.Fragment>
  )
}

export default MeetingRoom;