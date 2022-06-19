const readline = require('readline');
const fs = require('fs');
const user = readline.createInterface(process.stdin, process.stdout);
let todo;

function view() {
    if (todo == undefined) {
        console.log('The list is empty');
    } else {
        for (let i = 0; i < todo.length; i++) {
            console.log(i, todo[i][0], todo[i][1]);
        }
    }
}

function newItem(item) {
    if (item === undefined) {
        user.question('What would you like to add to the list?\n', response => {
            if (todo == undefined) {
                todo = [['[]', response]];
            } else {
                todo.push(['[]', response]);
            }
            menu();
        })
    } else {
        if (todo == undefined) {
            todo = [['[]', item]];
        } else {
            todo.push(['[]', item]);
        }
    }
}

function complete(x) {
    console.log(`Completed ${todo[x][1]}`);
    todo[x][0] = '[✓]';
}

function deleteItem(x) {
    console.log(`Removed ${todo[x][1]}`);
    todo.splice(x, 1);
}

function menu() {
        user.question('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n', response => {
            switch(response.length) {
                case 1:
                    switch(response) {
                        case 'v':
                            view();
                            menu();
                            break;
                        case 'n':
                            newItem();
                            break;
                        case 'q':
                            console.log('Understood. The program will now close.\nHave a good day.');
                            user.close();
                            break;
                        default:
                            console.log('Not a valid option.\nPlease try again');
                            menu();
                            break;
                    }
                    break;
                case 2:
                    switch(response[0]) {
                        case 'c':
                            complete(response[1]);
                            menu();
                            break;
                        case 'd': 
                            deleteItem(response[1]);
                            menu();
                            break;
                        default:
                            console.log('Not a valid option.\nPlease try again.');
                            menu();
                            break;
                    }
                    break;
                default:
                    console.log('Not a valid option.\nPlease try again.');
                    menu();
                    break;
            }
        })
}

if (process.argv.length > 2) {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let array = JSON.parse(data);
            array.forEach(element => {
                newItem(element.title);
                if (element.completed === true) {
                    complete(array.indexOf(element));
                }
            })
        }
        menu();
    });
} else {
   menu(); 
}
