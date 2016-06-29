import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import file from './file';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/', express.static(path.join(__dirname, '../build')));
app.use(bodyParser.urlencoded({extended: true}));
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Cache-Control', 'no-cache');
  next();
});


app.get('/', (request, response) => {
    response.header('Content-Type', 'text/html');
    response.sendFile("../public/index.html", {root: __dirname });
});

app.post('/', (request, response) => {
    let body = request.body;
    let name = body.name;
    let result;

    if (name === "") {
        result = { success: false, reason: 'No name specified!'}
         response
                .status(201)
                .send(JSON.stringify(result, null, ' '));
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

app.start = function(){
    var server = app.listen(port, '127.0.0.1', function(){
        var host = server.address();
        file.clear(() => {
            console.log("server is up on: " + host.address + ":" + host.port);
        });
    });
}

export default app;
