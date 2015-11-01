//Problem: We need a simple way to look at a user's badge count and Javascript points
var https = require('https');
var http = require('http');

//Print out Message
function printMessage(username, badgeCount, points) {
  var message = username + ' has ' + badgeCount + ' total badge(s) and ' + points + ' points in Javascript';
  console.log(message);
}

//Print out Error Message
function printError(error) {
  console.error(error.message);
}

function get(username) {
  //Connect to the API URL (http://teamtreehouse.com/username.json
  var request = https.get('https://teamtreehouse.com/' + username + '.json', function(res) {
    var body = "";

    //Read the data
    res.on('data', function(chunk) {
      body += chunk;
    });

    res.on('end', function() {
      if(res.statusCode === 200) {
        try {
          //parse data
          var profile = JSON.parse(body);
          //print data
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          //Parse Error
          printError(error);
        }
      } else {
        //Status Code Error

        printError({message: 'There was an error getting the profile for ' + username + '. (' + http.STATUS_CODES[res.statusCode] + ')'})
      }

    });

  });

  //Connection Error
  request.on('error', printError);

}

module.exports.get = get;
