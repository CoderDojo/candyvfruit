# CoderDojo - Start Node - Candy v Fruit

This is an introduction to server side programming in Node.js and was created for CoderDojo members. The aim of this game is to teach the fundamentals of programming and server side prorgamming in a fun way.

## Step 1 Install Node

Install Node from http://nodejs.org

## Step 2 Setup the project

Create the project folder 

````
mkdir coderdojo-start-node
````

Now create a folder called __public__, this is the folder whereyou will add the html, css and javascript code

````
cd coderdojo-start-node
mkdir public
````

## Install express 

__npm__ is Node Package Manager allows you to install Node Packages, to run a web server we are going to use a node package called __express__ will enable us to create a server easily that can accept web requests.

Now run 

````
npm install express
````

## Turn it into a communication, multiplayer game with socket.io 

Socket.io is a technology that allows browsers to easily communicate with the server over streams.  

Now run 

````
npm install socket.io
````

## Now lets create our Node.js file

Now in the home directory __candy-v-fruit__ save a new file called __app.js__.  Inside app.js add the following code

````
var express = require('express');
var app = express();


var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

````
This code creates your first server and first http call

## Run your code

From inside directory __candy-v-fruit__ open a command terminal and run 

````
node app

````
We are running __app__ because the file is called __app.js__

You should see the following output from this command

````
$ node app
Listening on port 3000
````

This is tell you that a server has started on your machine at port __3000__ 

You can stop the server at any time by running ````CTRL+C````

## Open your browser

Navigate to 

````
http://localhost:3000
````
Now see what happens 

## We now need update app.js to read your html code from the public folder

Update app.js with the following code

````javascript
var express = require('express');
var app = express();
var path = require('path');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});

var io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/coderdojo', function(req, res){
  res.send('Be cool');
});

io.on('connection', function (socket) {
  console.log('emitting');
  socket.on('chat', function (data) {
  	console.log('emitting 2');
    console.log(data);
    socket.broadcast.emit('chat',  data);
  });
});
```` 

Now open your browser and navigate to

```` 
http://localhost:3000 
````












