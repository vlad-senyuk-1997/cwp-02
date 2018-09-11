// client.js
const net = require('net');
const port = 8124;
const client = new net.Socket();
const requestString = '\r\nQA\r\n';

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

client.setEncoding('utf8');

client.connect(port, function() {
    console.log('Connected');
    let items = random();
    console.log(items);
    client.write(requestString);
});

client.on('data', function(data) {
    console.log(data);
    client.destroy();
});

client.on('close', function() {
    console.log('Connection closed');
});