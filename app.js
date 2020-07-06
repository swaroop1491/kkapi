var express = require('express');
var http = require('http');
const GoogleNewsRss = require('google-news-rss');

var app = express();
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();

app.get('/news/:id', function (req, res, next) {
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => res.json(resp));
});
var server = app.listen(app.get('port'), function () {
    var host = server.address().address
    var port = server.address().port
 
    console.log("Example app listening at http://%s:%s", host, port)
 })

