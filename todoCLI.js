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
    return menu();
}

function newItem() {
    user.question('What would you like to add to the list?\n', response => {
        if (todo == undefined) {
            todo = [['[]', response]];
        } else {
            todo.push(['[]', response]);
        }
        return menu();
    })
}

function complete(x) {
    console.log(`Completed ${todo[x][1]}`);
    todo[x][0] = '[✓]';
    return menu();
}

function deleteItem(x) {
    console.log(`Removed ${todo[x][1]}`);
    todo.splice(x, 1);
    return menu();
}

function menu() {
        user.question('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n', response => {
            switch(response.length) {
                case 1:
                    switch(response) {
                        case 'v':
                            return view();
                            break;
                        case 'n':
                            return newItem();
                            break;
                        case 'q':
                            console.log('Understood. The program will now close.\nHave a good day.');
                            user.close();
                            break;
                        default:
                            console.log('Not a valid option.\nPlease try again');
                            return menu();
                            break;
                    }
                    break;
                case 2:
                    switch(response[0]) {
                        case 'c':
                            return complete(response[1]);
                            break;
                        case 'd': 
                            return deleteItem(response[1]);
                            break;
                        default:
                            console.log('Not a valid option.\nPlease try again.');
                            return menu();
                            break;
                    }
                    break;
                default:
                    console.log('Not a valid option.\nPlease try again.');
                    return menu();
                    break;
            }
        })
}

if (process.argv.length > 1) {
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            new
        }
    })
} else {
   menu(); 
}
