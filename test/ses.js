"use strict";

var sesService = require("../emailProviders").ses;
var util = require("util");

describe("#Ses Email Service", function(){
	it("#Ses Send Email Via Text", function(done){
		this.timeout(0);
		//Sample data 
		var data = {
			to : ["to1emailid@abc.com","to2emailid@abc.com"],
			from : "fromemailid@abc.com",
			subject : "AWS SES Service Demo",
			text : "Hi we are testing aws ses email service"
		};
		
		sesService.sendEmail(data, function(err, data){
			if(err){
				return done(err);
			}
			console.log(data);
			done();
		});
	});

	it("#Ses Send Email Via Html", function(done){
		this.timeout(0);
		//Sample data 
		var data = {
			to : ["to1emailid@abc.com","to2emailid@abc.com"],
			from : "fromemailid@abc.com",
			bcc : ["to3emailid@abc.com"],
			from : "to4emailid@abc.com",
			subject : "AWS SES Service Demo",
			html : "<h1>Hi, </h1> <p>we are testing aws ses email service<p>"
		};
		
		sesService.sendEmail(data, function(err, data){
			if(err){
				return done(err);
			}
			console.log(data);
			done();
		});
	});
});