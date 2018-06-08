//require("dotenv").config();
var dot = require("dotenv").config();
var keys = require("./keys.js");
var request = require("request");
var Spotify = require('node-spotify-api');
var fs = require('fs');
var Twitter = require("twitter")


var spot = new Spotify(keys.spotify)
//console.log(spot);


//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);
function search() {
let search = process.argv[2];
let term = process.argv.slice(3).join(" ");
//console.log("term: "+term);


switch(search) {
    case "my-tweets":
    console.log("Retrieving your tweets");
    retrieveTweets();
    break;
    
    case `spotify-this-song`:
    console.log("Finding your song");
    spotifyThis(term);
    break;
    
    case `movie-this`:
    console.log("Finding your movie");
    omdbFind(term);
    break;

    case `do-what-it-says`:
    console.log("Doing what it says");
    doWhatItSays();
    break;
}

fs.appendFile("log.txt", "\n"+process.argv[2]+" "+process.argv[3]+"\n", function(err) {

    // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }
  
    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      //console.log("Content Added!");
    }
  
  });
}
function retrieveTweets() {
    var client = new Twitter(keys.twitter);
    var params = {screen_name: 'sauceChilddd'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
    //console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {

            console.log("Text: "+tweets[i].text+"\nDate created: "+tweets[i].created_at);
            fs.appendFile("log.txt", "Text: "+tweets[i].text+"\nDate created: "+tweets[i].created_at, function(err) {

                // If an error was experienced we say it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  //console.log("Content Added!");
                }
              
              });
            
        }    
    }
});
}

function spotifyThis(term) {
   /* var URL = "https://api.spotify.com/v1/search?query="+term+"&type=track&market=US&offset=0&limit=20";

    request(URL, function(err, response, body) {

        console.log("Artist: "+JSON.stringify(body))
    })*/
    //.items.name
    spot.search({ type: 'track', query: term, limit: "1" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        var preview = data.tracks.items[0].preview_url;
      //console.log(JSON.stringify(data)); 
      //console.log(JSON.stringify(data.tracks.items))
      //console.log("Name: "+data.tracks.items[0].artists[0].name+"")
      //console.log(data.tracks.items[0])
      //console.log("Artist: "+data.tracks.items[0].artists[0].name+"\nName: "+data.tracks.items[0].name+
      //"\nPreview: "+data.tracks.items[0].preview_url+"\nAlbum: "+data.tracks.items[0].album.name)
      var artists = [];
     
      for (var i =0; i < data.tracks.items[0].artists.length; i++) {
        //console.log("Try: "+data.tracks.items[0].artists[i].name);
        artists.push(data.tracks.items[0].artists[i].name);
       
      }
     // console.log("A: "+artists)
      console.log("Artist: "+artists+"\nName: "+data.tracks.items[0].name+
      "\nPreview: "+data.tracks.items[0].preview_url+"\nAlbum: "+data.tracks.items[0].album.name)

      fs.appendFile("log.txt", "Artist: "+artists+"\nName: "+data.tracks.items[0].name+
      "\nPreview: "+data.tracks.items[0].preview_url+"\nAlbum: "+data.tracks.items[0].album.name, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          //console.log("Content Added!");
        }
      
      });

      //console.log("Test: "+data.tracks.items[0].uri)
      });

}

function omdbFind(term) {
    var URL = "http://www.omdbapi.com/?t="+term+"&apikey=trilogy";

    request(URL, function(err, response, body) {
        //var movieData = JSON.stringify(body);
        //var movieInfo = JSON.parse(body)
        //console.log(JSON.stringify(movieData))
        //console.log(movieData);
        //console.log(body);
       // console.log(lineBreak);
        console.log("Name: "+JSON.parse(body).Title+"\nYear: "+JSON.parse(body).Year+
        "\nIMBD Rating: "+ JSON.parse(body).imdbRating +"\nRotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+
        "\nCountry: "+JSON.parse(body).Country+"\nLanguage :"+JSON.parse(body).Language+"\nPlot :"+JSON.parse(body).Plot+
        "\nActors: "+JSON.parse(body).Actors);

        fs.appendFile("log.txt","Name: "+JSON.parse(body).Title+"\nYear: "+JSON.parse(body).Year+
        "\nIMBD Rating: "+ JSON.parse(body).imdbRating +"\nRotten Tomatoes Rating: "+JSON.parse(body).Ratings[1].Value+
        "\nCountry: "+JSON.parse(body).Country+"\nLanguage :"+JSON.parse(body).Language+"\nPlot :"+JSON.parse(body).Plot+
        "\nActors: "+JSON.parse(body).Actors, function(err) {

        // If an error was experienced we say it.
        if (err) {
          console.log(err);
        }
      
        // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        else {
          //console.log("Content Added!");
        }
      
      });

        //console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        //console.log("Yea")
        
        //console.log("Rotten Tomatoes: "+JSON.parse(body).Ratings[1].Value)
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
      
      
       // console.log(data);
      
        
        var dataArr = data.split(",");
        //for (var i = 0; i < dataArr.length; i++) {
         // dataArr[i] = dataArr[i].trim();
          
          
        //}
        //console.log(dataArr);
       process.argv[2] = dataArr[0];
       process.argv[3] = dataArr[1];
       //search(process.argv[2],process.argv[3])
       search()


      
       // console.log(dataArr);
      
      });
      

}
search();