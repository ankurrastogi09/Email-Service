"use strict";

//Internal
var sendInBlueConfig = require("../config").sendInBlue;

//Third Party
var Mailin = require("../lib/sendInBlueLib");
var mailinClient = new Mailin(sendInBlueConfig.url, sendInBlueConfig.access_key, sendInBlueConfig.timeout);

var sendInBlue = {

	/**
		sendEmail Method to send single email.
	*/
	sendEmail : function(data, cb){
		var email_data = {};

		['to','subject','from','html','text','cc','bcc','replyto'].forEach(function(key){
			if(data[key]) email_data[key] = data[key];
		});

		mailinClient.send_email(data).on('complete', cb);
	}
};

module.exports = sendInBlue;