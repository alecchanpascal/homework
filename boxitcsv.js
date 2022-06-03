#! /usr/bin/env node

//function to draw horizontal lines - used to fill in box length
function drawLine (num) {
    let line = '';
    for (let i = 0; i < num; i++) {
        line += '━';
    }
    return line;
}

//function to draw the top border of the box given the max length of the two column values
function drawTopBorder (num, term) {
    let top = '';
    top += '┏';
    top += drawLine(num);
    top += '┳';
    top += drawLine(term);
    top += '┓';
    return top;
}

//function to draw the middle border of the box given the max length of the two column values
function drawMiddleBorder (num, term) {
    let middle = '';
    middle += '┣';
    middle += drawLine(num);
    middle += '╋';
    middle += drawLine(term);
    middle+= '┫';
    return middle;
}

//function to draw the bottom border of the box given the max length of the two column values
function drawBottomBorder (num, term) {
    let bottom = '';
    bottom += '┗';
    bottom += drawLine(num);
    bottom += '┻';
    bottom += drawLine(term);
    bottom += '┛';
    return bottom;
}

//function to draw bars around a given string with the given max length of an array of strings
function drawBarsAround (string, length, term) {
       let newString = '┃';
       newString += string;
       //adds whitespace so the final border matches up with the other borders in the array
       for (let i = 0; i < length-string.length; i++) {
           newString += ' ';
       }
       //adds a line only after the second term to properly close the box
       if (term !== 0) {
           newString += '┃';
       }
       return newString;
}

//function to put an array of strings into a box format
function boxIt (array) {
    let string = '';
    let length1 = 0; //maxLength of first column  value
    let length2 = 0; //maxLength of second column value
    //determine the largest string length in the array for a maximum length for the first and second term seperately
    for (let i = 0; i < array.length; i++) {
        for (let j = 0 ; j < array[i].length; j++) {
            switch (j) {
                case 0:
                    if (array[i][j].length > length1) {
                        length1 = array[i][j].length;
                    }
                    break;
                case 1:
                    if (array[i][j].length > length2) {
                        length2 = array[i][j].length; 
                    }
            }
        }
    }
    //iterates through the array putting each string in a box
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            switch (j) {
                case 0: 
                    //checks if the array is at the top of the box, if not, then put a middle border above
                    if (i === 0) {
                        string += drawTopBorder(length1, length2);
                        string += '\n';
                    } else {
                        string += drawMiddleBorder(length1, length2);
                        string += '\n';
                    }
                    //draws bars around the string with a length parameter to ensure the edges of the box line up and the column to ensure the box is closed properly
                    string += drawBarsAround(array[i][j], length1, j);
                    break;
                case 1: 
                    //draws bars around the string with a length parameter to ensure the edges of the box line up and the column to ensure the box is closed properly
                    string += drawBarsAround(array[i][j], length2, j);
                    string += '\n';
                    //draws the bottom border of the box
                    if (i+1 === array.length) {
                        string += drawBottomBorder(length1, length2);
                        string += '\n';
                    }
                    break;
            }
        }
    }
    return string;
}

//fileSystem module 
const fs = require("fs");
 
//read the user submitted csv file into a string
let file = fs.readFileSync(process.argv[2], "utf8");
 
//convert string to an array while splitting by rows and columns (denoted by ',');
file = file.split("\n\n");
for (let i in file) {
  file[i] = file[i].split(",");
}
console.log(boxIt(file));