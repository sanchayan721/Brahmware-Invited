const routerMeeting = require("express").Router();
const joinMeeting = require('../../controllers/meetingcontrollers/joinmeeting');

routerMeeting.route('/').post(joinMeeting);

module.exports = routerMeeting;