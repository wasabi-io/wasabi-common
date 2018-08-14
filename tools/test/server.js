const path = require('path');
const jsonServer = require('json-server');
const server = jsonServer.create();
const json = require("./data/db.json");
const router = jsonServer.router(json);
const middlewares = jsonServer.defaults();
const fs = require('fs');

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/file', (request, response) => {
    console.log(request.query);
    const file = request.query.file;
    const fileLocation = path.join(__dirname, file);
    response.download(fileLocation, file);
});

server.post('/upload', (req, res) => {
    return res.send("Received");
});

server.head('/file', function (req, res) {
    res.setHeader('content-type', 'text/plain');
    res.send();
});

server.head('/^(file).*', function (req, res) {
    res.setHeader('content-type', 'application/json; charset=utf-8');
    res.send();
});


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// Use default router
server.use(router);
server.listen(3002, () => {
    console.log('JSON Server is running')
});