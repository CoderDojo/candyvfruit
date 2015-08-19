var playerName;
var selectedImageId;
var selectedImageFile;
var gameStarted = false;
var imageCells = [];

function startGame() {
	playerName = $("#playerName").val();
	if(playerName) {
		$("#welcome").hide();
		retrieveIcons();
		drawGrid();
		runTimer(30);
	} else {
		alert("You must enter your name to start the game");
	}
}

function runTimer(currentTime) {
	$("#info").html(currentTime);
	currentTime = currentTime -1;
	if(currentTime >= 0) {
		setTimeout(function() {
			runTimer(currentTime);
		}, 1000);
	} else {
		postMoves();
	}
}

function retrieveIcons() {
	ajaxCall('GET', '/icons', '', loadIcons);
}

function loadIcons(iconData) {
	for(var iconNo = 0; iconNo < iconData.length; iconNo = iconNo + 1) {
		var icon = iconData[iconNo];
		var iconHtml = '<img src="'+icon.file+'" class="gameIcon"' +
		' onclick="moveIcon(\''+icon.file+'\',\''+icon.id+'\')" id="'+icon.id+'"></img>'; 
		$("#icons").append(iconHtml);
	}
}

function moveIcon(file, id) {
	selectedImageId = id;
	selectedImageFile = file;
	$("#"+id).remove();
}

function cellClick(cellId) {
	if(!gameStarted && selectedImageId) {
		var gridIcon = '<img src="'+selectedImageFile+'" class="gridIcon"' +
		' id="'+selectedImageId+'"></img>';
		$("#"+cellId).html(gridIcon);
		selectedImageId = "";
		selectedImageFile = "";
		var cell = {};
		cell.id = cellId;
		cell.imageId = selectedImageId;
		imageCells.push(cell);
	} else if(!gameStarted && !selectedImageId) {
		alert('You must select an icon first');
	}
}

function ajaxCall(type, url, data, success) {
	var body = JSON.stringify(data);
	$.ajax({
		type: type,
		url: url,
		data: body,
		dataType: "json",
		contentType: "application/json",
		success: function (response) {
			success(response);
		},
		error: function (errorData, status, errorThrown) {
			alert("Error calling " + url);
			console.log(errorData);
		}
	});
	
}

function drawGrid() {
	for(var row = 0; row <= 10; row = row+1) {
		var rowHtml = '<div class="row">';
		for(var col = 0; col <= 20; col=col+1) {
			var colHtml = '<div class="col" onclick="cellClick(\''+row+'-'+col+'\')" id="'+row+'-'+col+'"></div>';
			rowHtml = rowHtml + colHtml;
		}
		rowHtml = rowHtml + '</div>';
		$("#game").append(rowHtml);
	}
}

function postMoves() {
	var selectedCells = {};
	selectedCells.playerName = playerName;
	selectedCells.cells = imageCells;
	ajaxCall('POST', '/postmoves', selectedCells, movesPosted);
}

function movesPosted(responseData) {

}



