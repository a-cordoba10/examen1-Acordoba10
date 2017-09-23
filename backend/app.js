var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var GitHubApi = require("github");



var GridStore = require('mongodb').GridStore;
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://web:123456Sha@ds141524.mlab.com:41524/shaserviciocotizaciones';

var github = new GitHubApi({});

function getFavorites(callback) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var favorites = db.collection("favorites");
        favorites.find({}).toArray(function (err, favorites) {
            if (err) throw err;
            callback(err, favorites);
        });
        db.close();
    });
}

function postFavorites(callback, favorite) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var favorites = db.collection("favorites");
        favorites.insertMany([favorite], function (err, favorites) {
            if (err) throw err;
            callback(err, favorites);
        });
        db.close();
    });

}

var app = express();
var router = express.Router();

app.use('/', router);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/gitFollow/:namegitUserFollower', function(req, res, next) {
  console.log('Hola');
  let user = req.params.namegitUserFollower;
  
      github.users.getFollowingForUser({
          username: user
      }, function (err, dt) {
          res.json(dt.data);
      });
});

router.get('/favorites', function (req, res) {
        getFavorites(function (err, favorites) {
            if (err) {
                res.json(["Error while fetching favorites"]);
                return;
            }
            res.json(favorites);
        });
});
router.post('/favorites', function (req, res) {
        const favorite = req.body;
        postFavorites(function (err, favorite) {
            if (err) {
                res.json(["Error while saving favorite"]);
                return;
            }
            res.json(favorite);
        }, favorite);
    
});

app.use(express.static(path.join(__dirname, 'front/build/')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/front/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

module.exports = router;