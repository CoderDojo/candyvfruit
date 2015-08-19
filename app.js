var express = require('express');
var app = express();
var path = require('path');
var port = 3000;
var iconData = require('./icons.json');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/coderdojo', getCoderDojoMessage);
app.get('/icons', getIcons);

function getCoderDojoMessage(req, res) {
   res.send("Be cool");
}

function getIcons(req, res) {
	res.send(iconData);
}

function serverStarted() {
  console.log('Server started open browser and navigate to http://localhost:%d',
    server.address().port);
}

var server = app.listen(port, serverStarted);