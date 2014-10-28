var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var simplePrefs = require("sdk/simple-prefs");
var envs = simplePrefs.prefs['envs'];

var includes = [];


try{
	var envPairs = envs.split(",");
	for(var i = 0; i < envPairs.length; i++){
		var envPair = envPairs[i].split(":");
		includes.push("http://" + envPair[1] + "*");
		includes.push("https://" + envPair[1] + "*");
	}

} catch (exception){
	console.log(exception);
}


console.log(includes);

pageMod.PageMod({
  include: includes,
  contentScriptFile: [data.url("pagemodhandlers.js")],
  contentStyleFile: data.url("osd.css"),
  onAttach: function(worker) {
    worker.port.emit("handleEnvironmentPage", {	"envs" : envPairs });
  }
});