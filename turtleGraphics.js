#! /usr/bin/env node

class Turtle {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
        this.array = [[x, y]];
        this.direction = 'east';
    }

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

    left() {
        switch (this.direction) {
            case 'east':
                this.direction = 'north';
                break;
            case 'south': 
                this.direction = 'east';
                break;
            case 'west':
                this.directoin = 'south';
                break;
            case 'north': 
                this.direction = 'west';
                break;
        }
        return this;
    }

    allPoints() {
        console.log(this.array);
    }

    print() {
        let maxNorth = 0;
        let maxSouth = 0;
        let maxEast = 0;
        let maxWest = 0;
        let string = '';
        let walk = false;
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
        for (let i = maxNorth; i <= maxSouth; i++) {
            for (let j = maxWest; j <= maxEast; j++) {
                for (let k in this.array) {
                    if (this.array[k][0] === j && this.array[k][1] === i) {
                        if (this.array[0][0] === j && this.array[0][1] === i) {
                            string += ('▣');
                        } else if (this.array[this.array.length-1][0] === j && this.array[this.array.length-1][1]) {
                            string += ('★')
                        } else {
                            string += ('■')
                        }
                        walk = true;
                    }
                }
                if (walk === false) {
                    string += ('□');
                } else {
                    walk = false;
                }
                string += ' ';
            }
            string += ('\n');
        }
        console.log(string);
    }
}

//Seperating the user input into readable directions for the class
let string = process.argv[2];
let start = '';
string = string.split('-');
start = string[0].split(',');
let num1 = parseInt(start[1]);
start = start[0].split('');
let num2 = parseInt(start[1]);
const flash = new Turtle(num1, num2);
// const flash = new Turtle(0, 4).forward(3).left().forward(3).right().forward(5).right().forward(8).right().forward(5).right().forward(3).left().forward(3);
// flash.allPoints();
// flash.print();
