const express = require('express'); //import express
let fs = require('fs'); //import file system
const app = express();

const pathWeek1 = 'src_week/week1/myfile.txt'
console.log('path :: '+pathWeek1);


fs.writeFile( pathWeek1, 'Hello content!', 'utf8',  (err) => {
    if (err) throw err;
    console.log('write file success week1');

    console.log('read file myfile.txt')
    fs.readFile(pathWeek1, 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
    
}
);

// path: src_week\week1\index.js