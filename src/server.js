import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {add, read, remove, clear, edit} from './database';
/* eslint no-console: 0 */

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


app.get('/', (req, res) => {
  res.header('Content-Type', 'text/html');
  res.sendFile('../public/index.html', {root: __dirname});
});

app.get('/todos', (req, res) => {
  read().then(list => {
    res.status(200).send(list);
  }).catch(err => {
    console.log('GET todos err: ', err);
    throw err;
  });
});

app.post('/todos', (req, res) => {
  const data = req.body.data;
  add(data).then(list => {
    res.status(201).send(list);
  }).catch(err => {
    console.log('POST todos err: ', err);
    throw err;
  });
});

app.put('/todos', (req, res) => {
  const index = req.body.index;
  const data = req.body.data;

  if (data === '') {
    remove(index).then(list => {
      res.status(200).send(list);
    }).catch(err => {
      console.log('DELETE todos err: ', err);
      throw err;
    });
  } else {
    edit(data, index).then(list => {
      res.status(200).send(list);
    }).catch(err => {
      console.log('PUT todos err: ', err);
      throw err;
    });
  }
});

app.start = () => {
  const server = app.listen(port, '127.0.0.1', () => {
    const host = server.address();
    clear(() => {
      console.log('server is up on: %s:%s', host.address, host.port);
    }).catch(err => {
      console.log('clearing database err: ', err);
      throw err;
    });
  });
};

export default app;
