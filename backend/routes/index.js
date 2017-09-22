var express = require('express');
var router = express.Router();
var GitHubApi = require("github");
var path = require('path');

// Mongo DB
var GridStore = require('mongodb').GridStore;
var ObjectID = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://web:123456Sha@ds141524.mlab.com:41524/shaserviciocotizaciones';

var github = new GitHubApi({});

router.get('/gitFollow/:namegitUserFollower', function(req, res, next) {

  let user = req.params.namegitUserFollower;
  
      github.users.getFollowingForUser({
          username: user
      }, function (err, dt) {
          res.json(dt.data);
      });
});

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


module.exports = router;
