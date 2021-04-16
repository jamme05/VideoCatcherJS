const http = require('https');
const { WebhookClient } = require('discord.js');
var convert = require('xml-js');
const fs = require('fs');
require('dotenv').config();

let timeoutID;

function delayTimer() {
  timeoutID = setTimeout(delayedFunction, 30000);
}

function delayedFunction() {
	checkForVideo();
  delayTimer();
}
checkForVideo();
delayTimer();

function checkForVideo(){
	var files = fs.readdirSync('./guilds/');
	var file;
	for(file in files){
	file = files[file]
	var jsonfile = loadjson('./guilds/'+file)
	for(mode in jsonfile.channels){
	for(channeli in jsonfile.channels[mode]){
	var channel = jsonfile.channels[mode][channeli]
	getVideos(channel.id, (videos) => {
		if(videos.fail){
			console.log("Failed")
		}else{
			for(video in videos.videos){
				video = videos.videos[video]
				if(video['yt:videoId']._text == channel.latestvideoID) break;
				else{
					if(jsonfile.webhooks[mode].channelID == null || jsonfile.webhooks[mode].webhookID == null) break;
					var webhookClient = new WebhookClient(jsonfile.webhooks[mode].channelID, jsonfile.webhooks[mode].webhookID);
					//var status = video.snippet.liveBroadcastContent
					status = 'none'
					var message = jsonfile.webhooks[mode].message[status].replace(/{channel}/g, video.author.name._text).replace(/{link}/g, 'https://www.youtube.com/watch?v='+video['yt:videoId']._text).replace(/{release_date}/g, video.published._text).replace(/{title}/g, video.title._text)
					webhookClient.send(message, {}).catch(error => {
						console.log(error)
					});
					console.log(message)
					}
				}
				jsonfile.channels[mode][channeli].latestvideoID = videos.videos[0]['yt:videoId']._text
				fs.writeFile ('./guilds/'+file, JSON.stringify(jsonfile, null, 2), function(err) {
				if (err) throw err;
					console.log('complete');
				});
			}
	});
	}
}}
}

function getVideos(channel_id, func){
http.get(`https://www.youtube.com/feeds/videos.xml?channel_id=${channel_id}`, (response) => {

		var body = '';

		response.on('data', function(chunk){
				body += chunk;
				//console.log(body)
			});

		response.on('end', function(){
			var json = convert.xml2json(body, {compact: true, spaces: 4});
			json = JSON.parse(json);
			res = {videos: json.feed.entry, fail: false}
			//console.log(res);
			func(res);
		});
		}).on('error', function(e){
			console.log(e);
			res = {fail: true}
			func(res);
		});
}

function loadjson(path){
	try {
  const jsonString = fs.readFileSync(path)
  const json = JSON.parse(jsonString)
	return json
} catch(err) {
  return null
}
}