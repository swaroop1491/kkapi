var express = require('express');
var http = require('http');
var cors = require('cors')
const GoogleNewsRss = require('google-news-rss');

var app = express();
var corsOptions = {
    origin: 'http://localhost:4200/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();

app.get('/news/:id', cors(corsOptions),function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://kankhabar.com/*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => res.json(resp));
});
var server = app.listen(app.get('port'))

