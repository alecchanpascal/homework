class Turtle {
    constructor (x=0, y=0) {
        this.x = x;
        this.y = y;
        this.array = [[x, y]];
        this.direction = ['east'];
    }

    forward(a) {
        switch (this.direction[this.direction.length-1]) {
            case 'east':
                for (let i = 1; i <= a; i++) {
                    this.array.push([this.x+i, this.y]);
                    this.direction.push('east');
                }
                this.x += a;
                break;
            case 'south': 
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x, this.y+i]);
                    this.direction.push('south');
                }
                this.y += a;
                break;
            case 'west':
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x-i, this.y]);
                    this.direction.push('west');
                }
                this.x -=a;
                break;
            case 'north': 
                for(let i = 1; i <=a; i++){
                    this.array.push([this.x, this.y-i]);
                    this.direction.push('north');
                }
                this.y -= a;
                break;
        }
        return this;
    }

    right() {
        switch (this.direction[this.direction.length-1]) {
            case 'east':
                this.direction.push('south');
                break;
            case 'south': 
                this.direction.push('west');
                break;
            case 'west':
                this.direction.push('north');
                break;
            case 'north': 
                this.direction.push('east');
                break;
        }
        return this;
    }

    left() {
        switch (this.direction[this.direction.length-1]) {
            case 'east':
                this.direction.push('north');
                break;
            case 'south': 
                this.direction.push('east');
                break;
            case 'west':
                this.directoin.push('south');
                break;
            case 'north': 
                this.direction.push('west');
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
                        string += ('■');
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

const flash = new Turtle(0, 4).forward(3).left().forward(3).right().forward(5).right().forward(8).right().forward(5).right().forward(3).left().forward(3);
flash.allPoints();
flash.print();
