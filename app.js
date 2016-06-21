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


var app = require('express')(),
    port = process.env.PORT || 3000,
    _ = require('underscore');

todo = [
    {name: "name1", summary: "sum1"},
    {name: "name2", summary: "sum2"}
];

app.get('/', function(request, response){
    response.send('<h1>Hello World</h1>');
});

app.get('/todo', function(request, response) {
    response.send({ todo: todo });
});

app.get('/todo/:todoName', function(request, response) {
    var name = request.params.todoName;
    var _todo = _.find(todo, function(u) {
        return u.name == name;
    });

    var result = _todo
                    ? { success: true, name: _todo.name, description: _todo.summary }
                    : { success: false, reason: 'todo not found: ' + name };
    
    response.send(JSON.stringify(result, null, ' '));
});

app.post('/todo/:todoName/:todoSum', function(request, response) {
    var name = request.params.todoName;
    var sum = request.params.todoSum;
    console.log(sum);
    var _todo = _.find(todo, function(u) {
        return u.name == name;
    });

    var result = _todo
                    ? { success: false, reason: 'already exists: ' + name }
                    : { success: true, added: name};
    
    if (! _todo){
        todo.push({name: name, summary: ""});
    }

    response.send(JSON.stringify(result, null, ' '));
});


var server = app.listen(port, '127.0.0.1', function(){
    var host = server.address();
    console.log("server is up on: " + host.address + ":" + host.port);
});