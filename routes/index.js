var express = require('express');
var cheerioClient = require('cheerio-httpcli')
var router = express.Router();
require('dotenv').config();
var {Client} = require('pg');

var client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl:{
      rejectUnauthorized: false
  }
});
client.connect()
    .then(console.log("connected"))
    .catch(e=>console.log(e));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    message: '{}',
    word: ''
  });
});

router.get('/book', function(req, res, next){
  const query={
    text: 'SELECT * FROM mybook;'
  }
  client.query(query)
    .then(res=>{
      res.render('book', {
        rows:rows
      })
    })
    .catch(e=>console.log(e.stack));
});

router.get('/searchWord/:word', function(req, res, next){
  var request = {q: req.params["word"], tbm: "isch"};
  var promise = searchClearlyByGoogleImages(request);

  promise.then(function(result){
    var list = result.clearlyList;
    var i, length = list.length;
    var results = [];
    for(i = 0; i < length; i++){
      if(list[i].src){
        results.push(list[i].src);
      }
    }
    var resultJson = JSON.stringify(results);
    res.render('index', {message: resultJson, word: req.params["word"]});
  }, function(error){
    res.send(error);
  });
});

module.exports = router;

var searchCleary = function(url, request, clearly){
  var promiseCheerio = cheerioClient.fetch(url, request);

  return new Promise(function(resolve, reject){
    promiseCheerio.then(function(cheerioResult){
      if(cheerioResult.error){
        reject(cheerioResult.error);
      }else{
        var $ = cheerioResult.$;
        resolve({
          "clearlyList": clearly($),
          "cheerioJQuery": $
        });
      }
    }, function(error){
      reject(error);
    });
  });
}

var searchClearlyByGoogleImages = function(request){
  return searchCleary("http://www.google.co.jp/search", request, function($){
    var results = [];
    $("img").each(function(idx){
      var target = $(this);
      results.push({
        "src": target.eq(0).attr("data-src")
      });
    });
    return results;
  });
}
