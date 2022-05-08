const Meeting = require('../../models/Meeting');
const ErrorResponse = require('../../utils/errorResponse');

const joinMeeting = async (req, res, next) => {

    const { invitationCode, userName } = req.body;

    const meetingRoom = await Meeting.findOne( { roomID: invitationCode } );

    if(meetingRoom) {
        try {
            res.status(200).json({
                success: true,
                roomID: invitationCode,
                meetingName: meetingRoom.meetingName
            })
        } catch (error){
            next(new ErrorResponse("Can not Send Response to Client", 500));
        }
    } else {
        res.status(200).json({
            success: false,
            error: "Meeting Room Not Found. Please Check the Invitation Code and Try Again."
        })
    }
}

module.exports = joinMeeting;