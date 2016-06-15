"use strict";

//Third Party node modules
var aws = require("aws-sdk");

//Internal Node Modules
var util = require("util");

//SES Config
var sesConfig = require("../config/awsSes");

//Take Instance of aws ses class
var ses = new aws.SES(sesConfig);

var sesProvider = {
	sendEmail : function(data, cb){
		var invalidFlag = false;
		var options = {};
		var email_data = {};

		//Check if mandatory fields are present
		['from','to','subject', 'text'].forEach(function(key){
			if(!data[key]) invalidFlag = true;
		});

		//Throw error if mandatory details are not present
		if(invalidFlag) cb(new Error("Not sent mandatory details!!!"));

		//create email_data
		['to','subject','from','html','text','cc','bcc','replyto'].forEach(function(key){
			if(data[key]) email_data[key] = data[key];
		});

		//Add Source if email_data.from is present
		if(email_data.from) options.Source = email_data.from;
		
		//Add Destination if email_data.to is present
		if(email_data.to) {
			if(!options.Destination) options.Destination = {};
			if(!util.isArray(email_data.to)) email_data.to = [email_data.to];
			options.Destination.ToAddresses = email_data.to;
		}

		//Add Message Subject if email_data.subject is present
		if(email_data.subject){
			if(!options.Message) options.Message = {};
			if(!options.Message.Subject) options.Message.Subject = {};
			options.Message.Subject.Data = email_data.subject;
		}

		//Add Message Body if email_data.text id presnt
		if(email_data.text){
			if(!options.Message) options.Message = {};
			if(!options.Message.Body) options.Message.Body = {};
			if(!options.Message.Body.Text) options.Message.Body.Text = {};
			options.Message.Body.Text.Data = email_data.text;
		}

		//Call ses.sendEmail with email options
		ses.sendEmail(options, function(err, data) {
		    if(err) throw err
	        console.log('Email sent:');
	        console.log(data);
		});
	}
};

module.exports = sesProvider;
