const Select = require('./Select.js');
// show file in folder week1
const fs = require('fs');
const path = require('path');



const week = new Select({
    question: "Select week",
    options: ["Week1", "Week2"],
    answers: ["week1", "week2"],
    pointer: ">>",
    color: "cyan"
});


const selectWeek = async () =>{
    await week.start();
}

selectWeek();