//Initializing the readline and filesystem modules
const readline = require('readline');
const fs = require('fs');
const user = readline.createInterface(process.stdin, process.stdout);
//Initializing a todo list as an empty array
let todo = [];
//Initializing a string for file writing
let string = '';

//Function that checks if todo is empty and otherwise prints the contents of the todo list
function view() {
    if (todo.length === 0) {
        console.log('The list is empty');
    } else {
        for (let i = 0; i < todo.length; i++) {
            console.log(i, todo[i][0], todo[i][1]);
        }
    }
}

//Function to add new items to the todo list
function newItem(item) {
    //Checking if any items are being passed in from a file
    if (item === undefined) {
        //User input based item additions
        user.question('What would you like to add to the list?\n', response => {
            //Adding the user response to the list
            todo.push(['[]', response]);
            //Calling menu without closing user so the user can still be prompted
            menu();
        });
    } else {
        //Adding the file item to the list
            todo.push(['[]', item]);
    }
}

//Function to mark specific items at the indicated index as complete
function complete(x) {
    console.log(`Completed ${todo[x][1]}`);
    todo[x][0] = '[✓]';
}

//Function to delete specific items at the indicated index
function deleteItem(x) {
    console.log(`Removed ${todo[x][1]}`);
    todo.splice(x, 1);
}

//Function to save the todo list to a file
function save() {
    //Creating a string based off the todo list concatenated by newlines for readability
    string = todo.join('\n');
    //Writing to file
    user.question('Where would you like to save the file?\n', response => {
        //Saving the todo list to the path specified by the user
        fs.writeFile(response, string, err => {
            if (err) {
                console.log(err);
            } else {
                console.log(`List saved to ${response}`);
            }
        });
        //Calling the menu function without closing user so the user can still be prompted
        menu();
    });
}

//Function to oversee the menu operations and user prompt
function menu() {
        user.question('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit\n', response => {
            //Checking to determine which type of option the user selected
            switch(response.length) {
                case 1:
                    //Checking to determine which one length option was chosen and calling the related function
                    switch(response) {
                        //View option
                        case 'v':
                            view();
                            //Menu function is called after every option except for new, save and quit to get further user input
                            menu();
                            break;
                        //New option
                        case 'n':
                            //New, save, and quit do not call menu as they have differing functionality that needs the menu call to be elsewhere or excluded
                            newItem();
                            break;
                        //Save option
                        case 's':
                            //Calling the menu after option function instead of in the option function breaks functionality for new and save
                            save();
                            break;
                        //Quit option which closes the user thus ending the program
                        case 'q':
                            //Quit does not call menu again for obvious reasons
                            console.log('Understood. The program will now close.\nHave a good day.');
                            user.close();
                            break;
                        //Default case for any other responses as invalid
                        default:
                            console.log('Not a valid option.\nPlease try again');
                            menu();
                            break;
                    }
                    break;
                case 2:
                    //Checking to determine which two length response was chosen and calling the related function
                    switch(response[0]) {
                        //Complete option
                        case 'c':
                            complete(response[1]);
                            //Menu call is usually after option function call to ensure functionality for the reading in of a todo list from a file
                            menu();
                            break;
                        //Delete option
                        case 'd': 
                            deleteItem(response[1]);
                            //Otherwise menu call can interrupt the todo list being read in from the file, so it is only called after options in the menu itself
                            menu();
                            break;
                        //Default case for any other responses as invalid
                        default:
                            console.log('Not a valid option.\nPlease try again.');
                            menu();
                            break;
                    }
                    break;
                //Default case for any other responses as invalid
                default:
                    console.log('Not a valid option.\nPlease try again.');
                    menu();
                    break;
            }
        })
}

//Checking if there was a filename to be read passed in on program call
if (process.argv.length > 2) {
    //Reading the file and saving each item on it to the todo list
    fs.readFile(process.argv[2], 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            //Parsing the contents of the json file to an array of objects
            let array = JSON.parse(data);
            array.forEach(element => {
                newItem(element.title);
                //Checking if the current item should be marked as complete or not
                if (element.completed === true) {
                    complete(array.indexOf(element));
                }
            })
        }
        //Calling menu to allow augmentation of the read in list by the user
        menu();
    });
//Regular user input based todo list call
} else {
   menu(); 
}
