"use strict";

var sesService = require("../emailProviders").ses;
var util = require("util");

describe("#Ses Email Service", function(){
	it("#Ses Send Email", function(done){
		this.timeout(0);
		//Sample data 
		var data = {
			to : ["hi@oyegennie.com","hi@oyewiki.com"],
			from : "newsletter@oyewiki.com",
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
});