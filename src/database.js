import _ from 'lodash';
import path from 'path';
import jsonfile from 'jsonfile';

const filename = path.join(__dirname, 'database.json');

export function write(data) {
  return new Promise((resolve, reject) => {
    jsonfile.writeFile(filename, data, (err) => {
      if (err) reject(err);
      resolve(data);
    });
  });
}

export function read() {
  return new Promise((resolve, reject) => {
    jsonfile.readFile(filename, (err, obj) => {
      if (err) reject(err);
      resolve(obj);
    });
  });
}

export function add(data) {
  return read()
    .then(({todos}) => [...todos, data])
    .then(todos => write({todos}));
}

export function remove(index) {
  return read()
    .then(({todos}) => _.filter(todos, (item, idx) => index !== idx))
    .then(todos => write({todos}));
}

export function edit(data, index) {
  return read()
    .then(({todos}) => {
      const newTodos = todos;
      newTodos[index] = data;
      return newTodos;
    })
    .then(todos => write({todos}));
}

export function clear(cb) {
  return write({todos: []}).then(cb);
}
