// server.js
const net = require('net');
const port = 8124;
var seed = 0;

const server = net.createServer((client) => {
        console.log('Client connected');

client.id = Date.now() + seed++;

client.setEncoding('utf8');

client.on('data', (data) => {
    console.log(data);
client.write('\r\nHello!\r\nRegards,\r\nServer\r\n' + '\r\n' + client.id);
});

client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});