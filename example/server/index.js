const express = require('express');
const path = require('path');
const http = require('http');
const app = express()
const port = '3000'
const server = http.createServer(app);
server.listen(port);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', port);
console.log('3000 is listening')