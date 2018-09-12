const net = require('net');
const port = 8124;
const client = new net.Socket();

const requestString = '\r\nFILES\r\n';
const ascString = '\r\nASC\r\n';
const decString = '\r\nDEC\r\n';

const fs = require("fs");
const path = require('path');

const Buffer = require('buffer').Buffer;

function getArguments() {
    let files = [];

    for (let i = 2; i < process.argv.length; i++)
        files.push(process.argv[i]);

    return files;
}

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write(requestString);
});

client.on('data', function(data) {
    if (data === ascString){
        let files = getArguments();

        files.forEach((item)=>{
            if (fs.lstatSync(item).isDirectory()){
                fs.readdir(item, (err, fls) => {
                    const buf = Buffer.from(fls);
                    console.log(buf.toString('utf8'));
                    client.write(buf);
                });
            }
        });

        client.destroy();

    }else if (data === decString){
        client.destroy();
    }
});

client.on('close', function() {
    console.log('Connection closed');
});
