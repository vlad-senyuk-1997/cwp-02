// server.js
const net = require('net');
const port = 8124;
const requestString = '\r\nQA\r\n';
const ascString = '\r\nASC\r\n';
const decString = '\r\nDEC\r\n';
const json = require("./qa.json");
const log = require('log-to-file');
let seed = 0;

const requestFilesString = '\r\nFILES\r\n';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const server = net.createServer((client) => {
        console.log('Client connected');

        client.id = Date.now() + seed++;

    client.setEncoding('utf8');

        client.on('data', (data) => {
            if (data === requestString){
                client.write(ascString);
                log(client.id + " : " + ascString, "./client_id.log");
            }else if(data === requestFilesString){
                client.write(ascString);
            }else{
                const flag = getRandomInt(0, 1);
                if (flag === 0){
                    client.write(decString);
                    log(client.id + " : " + decString, "./client_id.log");
                    client.destroy();
                }else{
                    json.items.forEach((item)=>{
                        if (item["request"] === data){
                            client.write(item["response"]);
                            log(client.id + " : " + item["response"], "./client_id.log");
                        }
                    });
                }
            }
});

client.on('end', () => console.log('Client disconnected'));
});

server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
});