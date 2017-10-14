var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var input = process.argv[2];
var UserInput = process.argv[3];

var myTweetsFN = function(){
			if (input === "my-tweets"){
			var client = new Twitter(keys);
			var params = {screen_name: 'nodejs'};
			client.get('statuses/user_timeline', function(error, tweetData, response) {
		 	if (!error) {
		 	console.log('================ My Tweets ================');
		  	tweetData.forEach(function(obj) {
          	console.log('--------------------------');
          	console.log('Time: ' + obj.created_at);
          	console.log('Tweet: ' + obj.text);
          	console.log('--------------------------');
          	console.log(' ');
       		 });
        	console.log('===========================================');
       		 console.log(' ');
			}
		});
	}
};

var spotifyFN = function(){

	if (input === "spotify-this-song"){
	var spotify = new Spotify({
  	id: '1cdbdaa353ba4d958fb581955ab7614a',
  	secret: 'fb3b134f852a4305a206c04de7f1b691',
	});
 
	spotify.search({ type: 'track', query: UserInput}, function(err, data) {
  		if (err) {
    	return console.log('Error occurred: ' + err);
  		}
      if(data.tracks.items.length > 0) {
        var record = data.tracks.items[0];

        console.log(' ');
        console.log('================ Song Info ================');
        console.log('Artist: ' + record.artists[0].name);
        console.log('Name: ' + record.name);
        console.log('Link: ' + record.preview_url);
        console.log('Album: ' + record.album.name);
        console.log('===========================================');
        console.log(' ');

        app.logData(data);
      } else {
        console.log('No song data found.');
      } 
		});
	}
};

var movieThis = function(){
	if (input === "movie-this"){
    request('http://www.omdbapi.com/?t=' + UserInput +'&tomatoes=true', function (error, response) {
      if (!error && response.statusCode == 200) {
      	console.log(response);

        var movieData = JSON.parse(info);

        console.log('================ Movie Info ================');
        console.log('Title: ' + movieData.Title);
        console.log('Year: ' + movieData.Year);
        console.log('IMDB Rating: ' + movieData.imdbRating);
        console.log('Country: ' + movieData.Country);
        console.log('Language: ' + movieData.Language);
        console.log('Plot: ' + movieData.Plot);
        console.log('Actors: ' + movieData.Actors);
        console.log('Rotten Tomatoes Rating: ' + movieData.tomatoRating);
        console.log('Rotten Tomatoes URL: ' + movieData.tomatoURL);
        console.log('===========================================');


        app.logData(movieData);
      }
    });
  };
};

//Do-what-it-says function. 



myTweetsFN();
spotifyFN();
movieThis();


