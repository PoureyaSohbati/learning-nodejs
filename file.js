const fs = require('fs'),
       _ = require('underscore');

var exports = module.exports = {};
const filename = './text';
let fileEmpty;

exports.write = function (obj){
    if (fileEmpty){
        fs.writeFile(filename, JSON.stringify(obj), function (err) {
            if (err) return console.log(err);
        });
        fileEmpty = false;
    }
    else{
        fs.appendFile(filename, '\n' + JSON.stringify(obj), function (err) {
            if (err) return console.log(err);
        });  
    }
}

exports.readAll = function (){
    return fs.createReadStream(filename);
}

exports.clear = function(callback) {
    fs.writeFile(filename, '', () => {
        console.log('cleaned up the file: ' + filename);
        fileEmpty = true;
        callback();
    }); 
}

read = function(){
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'UTF-8', function(err, f){
            if (err) reject(err);
            resolve(f.toString().split('\n'));
        });
    });   
}

exports.isInFile = function(name){
    return read().then((todos) => {
        if (todos[0] == '') throw "file is empty";
        return todos.map((u) => JSON.parse(u));
    }).then((parsed) => {
        let obj = _.find(parsed, (u) => u.name == name);
        if (obj)
            return true;
        return false;
    }).catch((err) => {
        console.log(err);
    });
}

exports.findObj = function(name){
    return read().then((todos) => {
        if (todos[0] == '') throw "file is empty";
        return todos.map((u) => JSON.parse(u));
    }).then((parsed) => {
        return _.find(parsed, (u) => u.name == name);
    });
}