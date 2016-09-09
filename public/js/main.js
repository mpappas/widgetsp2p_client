
var socket = io("http://localhost:3000");

socket.on("disconnect", function() {
	setTitle("Disconnected");
});

socket.on("connect", function() {
	setTitle("Connected to Cyber Chat");
});

socket.on("message", function(message) {
	printMessage(message);
});

socket.on('welcome', function(data) {
                addMessage(data.message);

                // Respond with a message including this clients' id sent from the server
                socket.emit('i am client', {data: 'foo!', id: data.id});
            });
            socket.on('time', function(data) {
                addMessage(data.time);
            });
            socket.on('error', console.error.bind(console));
            socket.on('message', console.log.bind(console));

            function addMessage(message) {
                var text = document.createTextNode(message),
                    el = document.createElement('li'),
                    messages = document.getElementById('client_messages');

                el.appendChild(text);
                messages.appendChild(el);
            }

document.forms[0].onsubmit = function () {
    var input = document.getElementById("message");
    printMessage(input.value);
    socket.emit("chat", input.value);
    input.value = '';
};

function setTitle(title) {
    document.querySelector("h1").innerHTML = title;
}

function printMessage(message) {
    var p = document.createElement("p");
    p.innerText = message;
    document.querySelector("div.messages").appendChild(p);
}
