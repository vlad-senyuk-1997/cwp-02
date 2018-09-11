// server.js
const net = require('net');
const port = 8124;
var seed = 0;
const requestString = '\r\nQA\r\n';
const ascString = '\r\nASC\r\n';
const decString = '\r\nDEC\r\n';

const server = net.createServer((client) => {
        console.log('Client connected');

client.id = Date.now() + seed++;

client.setEncoding('utf8');

client.on('data', (data) => {
    if (data === requestString){
        client.write(ascString);
    }else{
        client.write(decString);
        client.disconnect();
    }
});

client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});