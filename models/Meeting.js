const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    roomID: {
        type: String,
        unique: true,
        required: true
    },
    meetingName: {
        type: String,
        required: true,
        default: "Meeting Room"
    },
    creator: {
        type: String,
        required: [false, "Optional"]
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    scheduledOn: {
        type: Date,
        default: Date.now()
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    putOnHub: {
        type: Boolean,
        default: false
    }
});

MeetingSchema.methods.getRoomID = async function() {
    return this.roomID
};

const Meeting = mongoose.model("Meeting", MeetingSchema);
module.exports = Meeting;