const Meeting = require('../../models/Meeting');
const { v4: uuidv4 } = require("uuid");
const ErrorResponse = require("../../utils/errorResponse");

const createMeeting = ( req, res, next ) => {
    const { meetingName, userName, putOnHub } = req.body;
    const uuid = uuidv4();
    
    Meeting.create({
        roomID: uuid,
        meetingName: meetingName ? meetingName : "Meeting Room",
        creator: userName,
        putOnHub: putOnHub
    })
    .then(
        res.status(200).json({
            success: true,
            roomID: uuid,
            meetingName: meetingName ? meetingName : "Meeting Room"
        })
    )
    .catch(() => next(new ErrorResponse("Unable to create Meeting", 300)));
}

module.exports = createMeeting;