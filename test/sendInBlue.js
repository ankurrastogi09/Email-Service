"use strict";

var sendInBlueService = require("../emailProviders").sendInBlue;
var util = require("util");

describe("#SendInBlue Email Service", function(){
	it("#SendInBlue Send Email", function(done){
		this.timeout(0);
		//Sample data 
		var data = {
			to : {"toemailid@abc.com" : "to person name"},
			from : ["fromemailid@abc.com", "from person name"],
			subject : "Test Subject",
			html : "Hi we are testing sendInBlue email service"
		};
		
		sendInBlueService.sendEmail(data, function(data){
			// if(err){
			// 	util.log(err);
			// 	return done(err);
			// }
			console.log(data);
			done();
		});
	});
});