var express = require('express');
var http = require('http');
var cors = require('cors')
const GoogleNewsRss = require('google-news-rss');

var app = express();
app.use(allowCrossDomain)
// var corsOptions = {
//     origin: 'http://localhost:4200/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();

app.get('/news/:id', function (req, res, next) {
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => res.json(resp));
});
var server = app.listen(app.get('port'))

