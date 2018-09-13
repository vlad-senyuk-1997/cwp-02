const child_process = require('child_process');
const count = process.argv[2];


for(let i=0; i < count; i++) {
    let worker_process = child_process.fork("./client-files.js", [i]);

    worker_process.on('close', function (code) {
        console.log('child process exited with code ' + code);
    });
}