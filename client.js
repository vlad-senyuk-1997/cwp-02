// client.js
const net = require('net');
const port = 8124;
const client = new net.Socket();
const requestString = '\r\nQA\r\n';
const ascString = '\r\nASC\r\n';
const decString = '\r\nDEC\r\n';

Array.prototype.shuffle = function( b )
{
    var i = this.length, j, t;
    while( i )
    {
        j = Math.floor( ( i-- ) * Math.random() );
        t = b && typeof this[i].shuffle!=='undefined' ? this[i].shuffle() : this[i];
        this[i] = this[j];
        this[j] = t;
    }

    return this;
};

function random(){
    let json = require("./qa.json");
    return json.items.shuffle();
}

let items = random();

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    client.write(requestString);
});

client.on('data', function(data) {
    if (items.length > 0){
        if (data === ascString){
            client.id = items.pop();
            client.write(client.id["request"]);
        }else if (data === decString){
            client.destroy();
        }else{
            let response = "";
            if (data === client.id["response"]){
                response = "OK";
            }else{
                response = "ERROR";
            }
            console.log(client.id);
            console.log(response);
            client.write(requestString);
        }
    }else{
        client.destroy();
    }

});

client.on('close', function() {
    console.log('Connection closed');
});