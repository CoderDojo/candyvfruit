var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/coderdojo', getCoderDojoMessage);


function getCoderDojoMessage() {
    console.log('Listening on port %d', server.address().port);
}

function serverStarted() {
  console.log('Server started open browser and navigate to http://localhost:%d',
    server.address().port);
}

var server = app.listen(port, serverStarted);


var io = require('socket.io')(server);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser());

app.get('/newgame', function(req, res){
    gameStarted = true;
    stateTime = new Date();
    res.send('Be cool');
});

app.get('/gameon', function(req, res){
   res.send(isGameOn());
});

app.get('/cleargame', function(req, res) {
	clearData();	
	res.send("cleared");
});

app.get('/gamename', function (req, res) {
	res.send(data.name);
});

function clearData() {
	data.name = "";
	data.started = "";
	data.players = [];
	updateGameDataToFile();
}

app.post('/addplayer', function(req, res) {
   console.log(req.body);
   console.log(data.players);
   checkFirstPlayer(req.body.name);
   addPlayer(req.body.id, req.body.name);
   res.status(200).jsonp(data.started);
});

app.get('/players', function (req, res) {
  res.send(data.players);
});

function checkFirstPlayer(playerName) {
	if(data.players.length == 0) {
		setupGame(playerName);
	}
}

function setupGame(playerName) {
	data.name = playerName + "'s game";
	startTime = new Date();
	startTime.setMinutes(startTime.getMinutes() +1);
	data.started = startTime;
	updateGameDataToFile();
}

function addPlayer(id, name) {
  var player = {};
  player.id = id;
  player.name = name;
  data.players.push(player);
  console.log(data.players);
  updateGameDataToFile();
}

function updateGameDataToFile() {
  fs.writeFile('./gamedata.json', 
    JSON.stringify(data, null, 4), 
    function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("JSON saved to file");
      }
  }); 
}

function isGameOn() {
	if(startTime && startTime != "") {
		var timeOut = 1000 * 60 * 10;
		var now = new Date();
		if(Math.abs(now - startTime) < timeOut) {
			return true;
		}
	}
	return false;
}

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('shot', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('shot',  data);
  });
});