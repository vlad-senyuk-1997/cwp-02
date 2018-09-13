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
        console.log(files);

        files.forEach((item)=>{
            if (fs.lstatSync(item).isDirectory()){
                fs.readdir(item, (err, fls) => {
                    if (err)
                        console.log(err);

                    let arr = [];
                    for (let i of fls){
                        arr.push(item + "/" + i);
                    }

                    console.log(arr);
                    const buf = JSON.stringify(arr);
                    client.write(buf);
                });
            }
        });

    }else if (data === decString){
        client.destroy();
    }
});

client.on('close', function() {
    console.log('Connection closed');
});
