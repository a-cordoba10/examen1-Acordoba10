'use strict'

var express = require('express');
var path = require('path');

var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

module.exports = router;

// public es la ruta en la url
//app.use("/public", express.static("./static"));

app.use(express.static(path.join(__dirname,'front/build/')));
app.get('/', function (req, res) {
    res.send('hello world');
});

app.listen(8080, function () {
    console.log("Listening on 8080");
});
var express = require('express');


var GitHubApi = require("github");
/* GET home page. */
router.get('/getFollowrs/:user', function(req, res, next) {
 var github = new GitHubApi({});
 github.users.getFollowingForUser({
     username: req.params.user
 }, function(err, data) {
     JSON.stringify(data);
 });

});
