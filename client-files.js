const net = require('net');
const port = 8124;
const client = new net.Socket();
const requestString = '\r\nFILES\r\n';

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write(requestString);
});

client.on('data', function(data) {

});

client.on('close', function() {
    console.log('Connection closed');
});