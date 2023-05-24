var stompClient = null;
var serverPath = "http://localhost:8080/";

function connect() {
	var socket = new SockJS(serverPath + 'gs-guide-websocket');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		console.log('Connected: ' + frame);
		startGameServer(); // initialize game server-side
		updateGameArea(); // starts main game loop
		stompClient.subscribe('/client/vue', function(greeting) {
			update(JSON.parse(greeting.body));
		});
	});
}

function disconnect() {
	if (stompClient !== null) {
		stompClient.disconnect();
	}
	console.log("Disconnected");
}

// Tell server game is started
function startGameServer() {
	stompClient.send("/game/initialize", {}, JSON.stringify({ 'message': 'startGame' }));
}

// Send click info to server
function sendClick(clickInfo) {
	stompClient.send("/game/update", {}, JSON.stringify({ 'click': clickInfo }));
}
