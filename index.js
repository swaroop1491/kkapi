var express = require('express');
var http = require('http');
var cors = require('cors');
const googleTrends = require('google-trends-api');
const GoogleNewsRss = require('google-news-rss');
const grabity = require("grabity");
const googleNewsScraper = require('google-news-scraper');
var previewData = [];
var app = express();
const googleNews = new GoogleNewsRss();

app.get('/', (req, res) => res.send('Home Page Route'));
app.get('/news/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => res.send(resp) );
});
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
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
