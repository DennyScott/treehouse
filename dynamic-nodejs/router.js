var Profile = require("./profile.js");
var renderer = require('./renderer');
var querystring = require('querystring');

var commonHeader = {'Content-Type': 'text/html'};

//Handle HTTP route GET / and POST / i.e. Home
function home(req, res) {
  //if url === '/' && GET
  if(req.url === '/') {
    if(req.method.toLowerCase() === 'get') {
      //show search
      res.writeHead(200, commonHeader);
      renderer.view('header', {}, res);
      renderer.view('search', {}, res);
      renderer.view('footer', {}, res);
      res.end()
    } else {
      //if url === '/' && POST
        //get the post data from body
      req.on('data', function(postBody) {
        //extract the username
        var query = querystring.parse(postBody.toString());
        
        //redirect to /:username
        res.writeHead(303, {"Location": '/' + query.username});
        res.write(query.username);
        res.end();
      });
    }
  }
}

//Handle HTTP route GET /:username i.e. /chalkers
function user(req, res) {
  //if url === '/...'
  var username = req.url.replace('/', '');
  if(username.length > 0) {
    res.writeHead(200, commonHeader);
    renderer.view('header', {}, res);

    //get json from Treehouse
    var studentProfile = new Profile(username);

    //on "end"
    studentProfile.on("end", function(profileJSON) {

      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }

      //Simple response
      renderer.view('profile', values, res);
      renderer.view('footer', {}, res);
      res.end()
    });

    //on "error"
    studentProfile.on("error", function(error) {
      //show error
      renderer.view('error', {errorMessage: error.message}, res);
      renderer.view('search', {}, res);
      renderer.view('footer', {}, res);
      res.end()
    });

  }
}

module.exports.home = home;
module.exports.user = user;
