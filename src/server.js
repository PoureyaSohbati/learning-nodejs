import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import {add, read, remove, clear, edit} from './database';
import sendEmail from '../email/backend';
import confirmString from '../email/confirmation';
import cloudinary from 'cloudinary';
import {fromFile} from './resolutionChecking';
/* eslint no-console: 0 */

const app = express();
const port = process.env.PORT || 3000;

/* =================================
                Cloudinary
   ================================= */
cloudinary.config({
  cloud_name: 'duddwqol5',
  api_key: '482322442416532',
  api_secret: 'EN056FHGske8zgVpmNWw7jyUpBc'
});

function upload() {
  console.log('-------------------------------');
  cloudinary.uploader.upload('/home/poury/Desktop/test.jpg', (result) => {
    console.log(result);
  });
  console.log('-------------------------------');
}

/* =================================
                Email
   ================================= */
const test = {
  from: '"testing" <psohbati@ucsc.edu>', // sender address
  to: 'pourya_s93@yahoo.com', // list of receivers
  subject: 'Confirmation', // Subject line
  //  text: 'Hello world 🐴', // plaintext body
  html: confirmString() // html body
};

app.get('/email', (req, res) => {
  sendEmail(test)
    .then((message) => {
      console.log('Message sent: %s', message);
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

/* =================================
                Todos
  ================================= */
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

  edit(data, index).then(list => {
    res.status(200).send(list);
  }).catch(err => {
    console.log('PUT todos err: ', err);
    throw err;
  });
});

app.delete('/todos/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  remove(index).then(list => {
    res.status(200).send(list);
  }).catch(err => {
    console.log('DELETE todos err: ', err);
    throw err;
  });
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

// fromFile();
export default app;
