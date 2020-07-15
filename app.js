var express = require('express');
var http = require('http');
var cors = require('cors')
const GoogleNewsRss = require('google-news-rss');
let grabity = require("grabity");
var app = express();
// Add headers
// var corsOptions = {
//     origin: 'http://localhost:4200/',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
app.set('port', (process.env.PORT || 8080))
//var server = http.createServer(app);
const googleNews = new GoogleNewsRss();
let returnArray = [];
app.get('/news/:id', function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
	var id = req.params.id;
    googleNews
   .search(id)
   .then(resp => {
       for (let x in resp){
        let it = await grabity.grabIt(resp[x].link);
        returnArray.push(it); 
       }
        res.json(returnArray);
   });
});
app.get('/test', (req, res) => res.send('Hello World!'))
var server = app.listen(app.get('port'))

