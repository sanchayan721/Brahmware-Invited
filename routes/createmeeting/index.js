const routerMeeting = require("express").Router();

const createMeeting = require('../../controllers/meetingcontrollers/createmeeting');

routerMeeting.route('/').post(createMeeting);

module.exports = routerMeeting;