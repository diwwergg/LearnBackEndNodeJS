// read write file fs
// path :: src_week/week1/myfile.txt

const fs = require('fs');

const dirWeek1 = 'src_week/week1/Day1/'
const readPath = ['head', 'body', 'leg', 'feet']

let result = [];
const readFs = () => {
    fs.readFile(dirWeek1 + readPath[0] + '.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);
        result.push(data);
        fs.readFile(dirWeek1 + readPath[1] + '.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log(data);
            result.push(data);
            fs.readFile(dirWeek1 + readPath[2] + '.txt', 'utf8', (err, data) => {
                if (err) throw err;
                console.log(data);
                result.push(data);
                fs.readFile(dirWeek1 + readPath[3] + '.txt', 'utf8', (err, data) => {
                    if (err) throw err;
                    console.log(data);
                    result.push(data);
                    console.log(result);

                    fs.writeFile(dirWeek1 + 'robot.txt', result.join('\n'), 'utf8', (err) => {
                        if (err) throw err;
                        console.log('write file robot.txt success week1');
                    })

                })
            })
        })
    }
    );
}

readFs();
