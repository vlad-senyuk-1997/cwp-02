// client.js
const net = require('net');
const port = 8124;
const client = new net.Socket();
const requestString = '\r\nQA\r\n';
let json = require("./qa.json");

function 

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write(requestString);
});

client.on('data', function(data) {
    console.log(data);
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});