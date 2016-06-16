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
		['from','to','subject'].forEach(function(key){
			if(!data[key]) invalidFlag = true;
		});

		//Check if both text and html is not present
		if(!email_data.text && !email_data.html){
			invalidFlag = true;
		}

		//Throw error if mandatory details are not present
		if(invalidFlag) cb(new Error("Not sent mandatory details!!!"));

		//create email_data
		['to','subject','from','html','text','cc','bcc','replyto'].forEach(function(key){
			if(data[key]) email_data[key] = data[key];
		});

		//Add Source if email_data.from is present
		if(email_data.from) options.Source = email_data.from;
		
		//Add Destination.ToAddresses if email_data.to is present
		if(email_data.to) {
			if(!options.Destination) options.Destination = {};
			if(!util.isArray(email_data.to)) email_data.to = [email_data.to];
			options.Destination.ToAddresses = email_data.to;
		}

		//Add Destination.CcAddresses if email_aata.cc is present
		if(email_data.cc) {
			if(!options.Destination) options.Destination = {};
			if(!util.isArray(email_data.cc)) email_data.cc = [email_data.cc];
			options.Destination.CcAddresses = email_data.cc;
		}

		//Add Destination.BccAddresses if email_data.bcc is present
		if(email_data.bcc) {
			if(!options.Destination) options.Destination = {};
			if(!util.isArray(email_data.bcc)) email_data.bcc = [email_data.bcc];
			options.Destination.BccAddresses = email_data.bcc;
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

		//Add Message Html if email_data.html id presnt
		if(email_data.html){
			if(!options.Message) options.Message = {};
			if(!options.Message.Body) options.Message.Body = {};
			if(!options.Message.Body.Html) options.Message.Body.Html = {};
			options.Message.Body.Html.Data = email_data.html;
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
