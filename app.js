var express = require('express');
var http = require('http');
var cors = require('cors');
const urlMetadata = require('url-metadata')
const googleTrends = require('google-trends-api');
const GoogleNewsRss = require('google-news-rss');
const googleNewsScraper = require('google-news-scraper');
const urlMetadata = require('url-metadata');
var previewData = [];
var app = express();
// Add headers
// var corsOptions = {
//     origin: 'http://localhost:4200/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();

app.get('/news/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	var id = req.params.id;
    googleNews
   .search(id)
   .then(function(resp) {
     for(let i=0;i<resp.length;i++){
       let z = preview(resp[i].link);
      previewData.push(z);
     }
     res.send(previewData);
   } );
});
async preview => (url){
  await urlMetadata(resp[i].link).then(
      function (metadata) { // success handler
        return metadata;
      },
      function (error) { // failure handler
        console.log(error)
      })
};
app.get('/trends/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Content-Type', 'application/json');
	var id = req.params.id;
    googleTrends.relatedQueries({keyword: id})
.then(function(r){
  let x = r.replace(/\\/g, "");
  console.log(x)
  res.send(x);
})
});
app.get('/preview/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Content-Type', 'application/json');
	var id = req.params.id;
   res.send('Hello World!')
// urlMetadata(id).then(
//   function (metadata) { // success handler
//     res.send(metadata);
//   },
//   function (error) { // failure handler
//     console.log(error)
//   })
});
app.get('/test', (req, res) => res.send('Hello World!'))
var server = app.listen(app.get('port'))

