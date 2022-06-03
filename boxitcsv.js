#! /usr/bin/env node

//function to draw horizontal lines - used to fill in box length
function drawLine (num) {
    let line = '';
    for (let i = 0; i < num; i++) {
        line += '━';
    }
    return line;
}

//function to draw the top border of the box given the length
function drawTopBorder (num) {
    let top = '';
    top += '┏';
    top += drawLine(num);
    top += '┓';
    return top;
}

//function to draw the middle border of the box given the length
function drawMiddleBorder (num) {
    let middle = '';
    middle += '┣';
    middle+= drawLine(num);
    middle+= '┫';
    return middle;
}

//function to draw the bottom border of the box given the length
function drawBottomBorder (num) {
    let bottom = '';
    bottom += '┗';
    bottom += drawLine(num);
    bottom += '┛';
    return bottom;
}

//function to draw bars around a given string with the given max length of an array of strings
function drawBarsAround (string, length) {
       let newString = '┃';
       newString += string;
       //adds whitespace so the final border matches up with the other borders in the array
       for (let i = 0; i < length-string.length; i++) {
           newString += ' ';
       }
       newString += '┃';
       return newString;
}

//function to put an array of strings into a box format
function boxIt (array) {
    let string = '';
    let length = 0;
    //determine the largest string length in the array for a maximum length
    for (let i = 0; i < array.length; i++) {
        if (array[i].length > length) {
            length = array[i].length;
        }
    }
    //iterates through the array putting each string in a box
    for (let i = 0; i < array.length; i++) {
        //checks if the array is at the top of the box, if not, then put a middle border above
        if (i === 0) {
            string += drawTopBorder(length);
            string += '\n';
        } else {
            string += drawMiddleBorder(length);
            string += '\n';
        }
        //draws bars around the string with a length parameter to ensure the edges of the box line up
        string += drawBarsAround(array[i], length);
        string += '\n';
        //draws the bottom border of the box
        if (i+1 === array.length) {
            string += drawBottomBorder(length);
        }
    }
    return string;
}

function main(array){
    let input = $.csv.toObjects(array);
    console.log(input);
    return boxIt(input);
}

console.log(main(process.argv[2]));