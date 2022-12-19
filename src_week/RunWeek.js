const Select = require('./Select.js');
const { spawn } = require('child_process');
const path = require('path');

const rootPath = path.resolve(__dirname, '..') + '/src_week/';

const week = new Select({
    question: "Select week to run (use arrow keys)",
    options: ["Week1", "Week2"],
    answers: ["week1", "week2"],
    pointer: ">>",
    color: "cyan"
});

const commandLookup = { 
    week1: `node ${rootPath}week1/app.js`,
    week2: `node ${rootPath}week2/database.js`,
    // Add more entries for additional weeks
    };

week.start().then((selectedAnswer) => { runCommand(selectedAnswer) });


const runCommand = (selectedAnswer) => {
    console.log(`You selected: ${selectedAnswer}`);
      const command = commandLookup[selectedAnswer];
      console.log(command ? command : 'No command found' );
      if (command) {
        console.log(`Running "${command}"`);
        const child = spawn(command.split(' ')[0], command.split(' ').slice(1));
        child.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
        child.stderr.on('data', (data) => {
          console.error(`stderr: ${data}`);
        });
        child.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
      }
}