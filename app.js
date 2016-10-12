var express = require('express'),
    bodyParser = require('body-parser');

// Set up an express server (not starting it yet)
var server = express();

server.use(express.static('./client'));

server.use(bodyParser.json());

server.listen(3600);
