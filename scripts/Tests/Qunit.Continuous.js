QUnit.log = function(settings){
	if(!settings.result){
		console.log("Fail!");
		console.log("Expected: " + settings.expected);
		console.log("Actual: " + settings.actual);
		if(settings.message){
			console.log("Message: "+  settings.message);
		}
	}
};

QUnit.moduleStart = function(settings){
	console.log("Running module " + settings.name);
};

QUnit.testDone = function(settings){
	if(settings.failed > 0){
		//##teamcity[testFailed name='testname' message='failure message' details='message and stack trace']
		console.log("\tTest '" + settings.name + "' fail, " + settings.failed + " failed");
		return;
	}
};
