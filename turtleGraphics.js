#! /usr/bin/env node

class Turtle {
    //Constructor for the turtle class that takes an 'x' and 'y' value for the starting position and establishes an array of steps the turtle takes along with the current direction it's facing
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
        this.array = [[x, y]];
        this.direction = 'east';
    }

    //Method to move forward in the direction the turtle is facing given the inputed value 'a'
    forward(a) {
        switch (this.direction) {
            case 'east':
                for (let i = 1; i <= a; i++) {
                    this.array.push([this.x+i, this.y]);
                }
                this.x += a;
                break;
            case 'south': 
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x, this.y+i]);
                }
                this.y += a;
                break;
            case 'west':
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x-i, this.y]);
                }
                this.x -=a;
                break;
            case 'north': 
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x, this.y-i]);
                }
                this.y -= a;
                break;
        }
        return this;
    }

    //Changing the direction to the right of the current direction
    right() {
        switch (this.direction) {
            case 'east':
                this.direction = 'south';
                break;
            case 'south': 
                this.direction = 'west';
                break;
            case 'west':
                this.direction = 'north';
                break;
            case 'north': 
                this.direction = 'east';
                break;
        }
        return this;
    }

    //Changing the direction to the left of the current direction
    left() {
        switch (this.direction) {
            case 'east':
                this.direction = 'north';
                break;
            case 'south': 
                this.direction = 'east';
                break;
            case 'west':
                this.direction = 'south';
                break;
            case 'north': 
                this.direction = 'west';
                break;
        }
        return this;
    }

    //Printing out the steps the turtle took to make the path it made
    allPoints() {
        console.log(this.array);
    }

    //Printing out the steps the turtle took on a grid that starts at (0,0) and goes to the max height and width that the turtle reached
    print() {
        let maxNorth = 0;
        let maxSouth = 0;
        let maxEast = 0;
        let maxWest = 0;
        //String of the path to be printed
        let string = '';
        //Boolean to check whether the turtle has already taken a step or not
        let walk = false;
        //Array of coordinates to be printed
        let arrayToPrint = this.array;
        //Getting the maximum width and height (negative and posititve) that the turtle walks
        for (let i in this.array) {
            if (maxEast < this.array[i][0]) {
                maxEast = this.array[i][0];
            }
            if (maxWest > this.array[i][0]) {
                maxWest = this.array[i][0];
            }
            if (maxSouth < this.array[i][1]){
                maxSouth = this.array[i][1];
            }
            if (maxNorth > this.array[i][1]) {
                maxNorth = this.array[i][1];
            }
        }
        //Getting rid of duplicate steps in the path for printing
        for (let i in arrayToPrint) {
            for (let j in arrayToPrint) {
                if (i !== j && arrayToPrint[i][0] === arrayToPrint[j][0] && arrayToPrint[i][1] === arrayToPrint[j][1]) {
                    // if (j == arrayToPrint.length-1) {
                    //     arrayToPrint.splice(i, 1);
                    // } else {
                        arrayToPrint.splice(j, 1);
                    //}
                }
            }
        }
        //Iterating through the min and max width and heights to print out the grid and the turtle steps
        for (let i = maxNorth; i <= maxSouth; i++) {
            for (let j = maxWest; j <= maxEast; j++) {
                //Checking if the turtle took a step at this point in the grid at any time
                for (let k in arrayToPrint) {
                    if (arrayToPrint[k][0] === j && arrayToPrint[k][1] === i) {
                        //Starting block for where the turtle starts
                        if (arrayToPrint[0][0] === j && arrayToPrint[0][1] === i) {
                            string += ('▣');
                        // //Ending star for where the turtle ends up
                        // } else if (arrayToPrint[arrayToPrint.length-1][0] === j && arrayToPrint[arrayToPrint.length-1][1] === i) {
                        //     string += ('★')
                        //Regular block for where the turtle had walked
                        } else {
                            string += ('■')
                        }
                        //Setting walk to true so that no further printing is done for that coordinate
                        walk = true;
                    }
                }
                //Empty block for where the turtle hasn't walked
                if (walk === false) {
                    string += ('□');
                //Re-establishing the walk value
                } else {
                    walk = false;
                }
                //Spacing the blocks out
                string += ' ';
            }
            //Going to the next row of blocks
            string += ('\n');
        }
        //Output the result
        return (string);
    }
}

//Seperating the user input into readable directions for the class by the delimiter '-'
let string = '';
let start = '';
let num1 = 0;
let num2 = 0;
if (process.argv[3] !== undefined) {
    string = process.argv[3];
    string = string.split('-');
    if (string[0][0] == 't') {
        //Getting information to create an instance of the turtle class from the start of the user input by the delimiter ','
        start = string[0].split(',');
        //Saving the second or 'y' value
        num2 = parseInt(start[1]);
        //Seperating the first or 'x' value from t and saving it
        start = start[0].split('');
        num1 = parseInt(start[1]);
        //Declaring the instance of turtle with the saved 'x' and 'y' values
    }
    const flash = new Turtle(num1, num2);
    //Iterating through the remaining string to enact user specified directions
    for (let i in string) {
        switch(string[i][0].toLowerCase()) {
            case 'f': 
                string[i] = string[i].slice(1,string[i].length);
                flash.forward(parseInt(string[i]));
                break;
            case 'r':
                flash.right();
                break;
            case 'l':
                flash.left();
                break;
        }
    }
    //Creating a file with the turtle's path
    const fs = require('fs');
    let fileName = process.argv[2];
    fileName = fileName.split('=');
    fileName = fileName[1];
    fs.writeFile(fileName, flash.print(), err => {
    if (err) {
        console.error(err);
    }
    console.log('🐢 Drawing written to drawing.txt')
    });
} else if (process.argv[2] !== undefined) {
    string = process.argv[2];
    string = string.split('-');
    if (string[0][0] == 't') {
        //Getting information to create an instance of the turtle class from the start of the user input by the delimiter ','
        start = string[0].split(',');
        //Saving the second or 'y' value
        num2 = parseInt(start[1]);
        //Seperating the first or 'x' value from t and saving it
        start = start[0].split('');
        num1 = parseInt(start[1]);
        //Declaring the instance of turtle with the saved 'x' and 'y' values
    }
    const flash = new Turtle(num1, num2);
    //Iterating through the remaining string to enact user specified directions
    for (let i in string) {
        switch(string[i][0].toLowerCase()) {
            case 'f': 
                string[i] = string[i].slice(1,string[i].length);
                flash.forward(parseInt(string[i]));
                break;
            case 'r':
                flash.right();
                break;
            case 'l':
                flash.left();
                break;
        }
    }
    console.log(flash.print());
} else {
    // Old pre-script functionality
    //Change values here to whatever you want to test
    const flash = new Turtle(0, 4).forward(3).left().forward(3).right().forward(5).right().forward(8).right().forward(5).right().forward(3).left().forward(3);
    flash.allPoints();
    console.log(flash.print());
}
