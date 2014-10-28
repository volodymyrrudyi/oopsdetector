
function findMatch(location, pairs){
	
	for(var i = 0; i < pairs.length; i++){
		var pair = pairs[i].split(":");
		if (location.indexOf(pair[1]) > -1){
			return pair;
		}
	}

	return null;
}

self.port.on("handleEnvironmentPage", function(environmentData) {

	try{
	var osdDiv = document.createElement('div');
	osdDiv.id = "oopsDetectorOSD";

	var environment = "Unknown environment";
	var location = window.location.href;
	var match = findMatch(location, environmentData.envs);
	if (match){
		environment = match[0];
	}
	
	osdDiv.textContent = environment;
	document.body.appendChild(osdDiv);

	} catch(exception){
		console.error(exception);
	}
});

