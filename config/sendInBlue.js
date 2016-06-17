"use strict";

module.exports = require('rc')('sendinblue',{
	url : "" //API URL  Provided by SendInBlue,
	access_key : "" //Access Key Provided by SendInBlue,
	timeout : 5000 //Set timeout for API calls
});