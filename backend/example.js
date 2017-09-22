var express = require('express');
var router = express.Router();
var GitHubApi = require("github");
/* GET home page. */
router.get('/getFollowrs/:user', function(req, res, next) {


  
 var github = new GitHubApi({});
  
  
 github.users.getFollowingForUser({
     username: req.params.user
 }, function(err, data) {
     console.log(JSON.stringify(data));
 });

 app.use(express.static(path.join(__dirname,'front/build/')));
 app.get('/', function (req, res) {
     res.send('hello world');
 });


});

module.exports = router;
