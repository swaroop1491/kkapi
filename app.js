var express = require('express');
var http = require('http');
const GoogleNewsRss = require('google-news-rss');

var app = express();
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();

app.get('/news/:id', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://kankhabar.com/*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => res.json(resp));
});
var server = app.listen(app.get('port'))

