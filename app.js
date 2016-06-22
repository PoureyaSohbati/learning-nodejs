/*var http = require('http');
var fs = require('fs');

function send404Response(response){
    response.writeHead(404, {"Context-Type" : "text/plain"});
    response.write("Error 404: Page not found!");
    response.end();
}

function onRequest(request, response){
    if ( request.method == 'GET' && request.url == '/'){
        response.writeHead(200, {"Context-Type" : "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    }
    else if ( request.method == 'GET' && request.url == '/file'){
        response.writeHead(200, {"Context-Type" : "text/plain"});
        fs.createReadStream("./text").pipe(response);
    }
    else if ( request.method == 'POST' && request.url == '/test'){
        var data = request.body;
        console.log(data);
        console.log("asdfasdfadsf");
    }
    else{
        send404Response(response);
    }
}

function writeToFile(str){
    fs.appendFile('text', '\n' + str, function (err) {
        if (err) return console.log(err);
        console.log(str + ' > text');
    });
}

http.createServer(onRequest).listen(8000);
console.log("Server is now running...");*/


const app  = require('express')(),
    port = process.env.PORT || 3000,
    fs   = require('fs'),
    bodyParser = require('body-parser'),
    _    = require('underscore'),
    file = require('./file');

app.use(bodyParser.json());

todo = [];

app.get('/', (request, response) => {
    response.header('Content-Type', 'text/html');
    response.sendFile("./index.html", {root: __dirname });
});

app.post('/', (request, response) => {
    let body = request.body;
    let name = body.name;
    let result;

    if (name == "") {
        result = { success: false, reason: 'No name specified!'}
    }
    else {
        file.isInFile(name).then((found) => {
            result = found
                    ? { success: false, reason: 'already exists: ' + name }
                    : { success: true, added: { name: body.name, description: body.description }};
        
            if (!found){
                file.write({name: body.name, description: body.description});
            }

            response
                .status(201)
                .send(JSON.stringify(result, null, ' '));
        });
    }
});

app.get('/todo', (request, response) => {
    //response.send({ todo: todo });
    response.writeHead(200, {"Context-Type" : "text/plain"});
    file.readAll().pipe(response);
});

app.get('/todo/:todoName', (request, response) => {
    var name = request.params.todoName;
    file.findObj(name).then((obj) => {
        var result = obj
                    ? { success: true, name: obj.name, description: obj.description }
                    : { success: false, reason: 'todo not found: ' + name };

        response
            .send(JSON.stringify(result, null, ' '));
    });
});


var server = app.listen(port, '127.0.0.1', function(){
    var host = server.address();
    file.clear(() => {
         console.log("server is up on: " + host.address + ":" + host.port);
    });
    //console.log("server is up on: " + host.address + ":" + host.port);
});