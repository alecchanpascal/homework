//Function to fix a given array of members
function fix(array) {
    //First split by any commas which the user should be using to differentiate member names
    //Was going to change empty space to commas originally but I can't be sure a user won't enter a nickname or title for one person that contains spaces, e.g. The Real Slim Shady
    let members = array.split(',');
    //The splits by \r\n to get rid of any newlines the user may have entered by accident or otherwise
    members = members.map(element => {
        element = element.split("\r\n");
        return element
    });
    members = members.flat();
    //Iterates through the array to get rid of any empty characters and add spaces to the beginning of each name for readability purposes
    for (let i = 0; i < members.length; i++) {
        if (members[i] == ' ' || members[i] == '') {
            members.splice(i, 1);
            //Resets the iterator value to check for whatever has been moved into the index of the cleared item
            i--;
        }
        if (members[i][0] != ' ') {
            members[i] = ' ' + members[i]
        }
    }
    return members;
}

//Function to determine team assignment based off of user choices
//Array = members list
//String = chosen method, either team count of members per team
//Num = the quantity chosen by the user
function assignment(array, string, num) {
    let result;
    //Count is the predetermined number of teams or members per team based off of member list size and the user given quantity (rounded up because you can't have half a person and it's rude to get rid of someone)
    const count = Math.ceil(array.length/num);
    if (string == 'teamCount') {
        result = [];
        //By team count, iterate first throught the number of teams wanted based on the user given quantity, setting the current index of the result array to it's own array
        for (let i = 0; i < num; i++) {
            result[i] = [];
            //Then iterate through the members list for the predetermined amount of members per team, while ensuring to move to the next member each subsequent loop
            for (let j = (i*count); j < (i*count)+count; j++) {
                if (array[j]) {
                    result[i].push(array[j]);
                }
            }
        }
    } else if (string == 'perTeam') {
        result = [];
        //By members per team, iterate first through the number of teams wanted based on the predetermined amount, still setting the current index of the result array to it's own array
        for (let i = 0; i < count; i++) {
            result[i] = [];
            //Then iterate through the members list for the user given quantity of members per team, while still ensuring to move to the next member each subsequent loop 
            for (let j = (i*num); j < (i*num)+num; j++) {
                if (array[j]) {
                    result[i].push(array[j]);
                }
            }
        }
    }
    return result
}

//Export for use in cohortRouter.js
module.exports = {assignment, fix};