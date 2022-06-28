function fix(array) {
    let members = array.split(',');
    members = members.map(element => {
        element = element.split("\r\n");
        return element
    });
    members = members.flat();
    for (let i = 0; i < members.length; i++) {
        if (members[i] == ' ' || members[i] == '') {
            members.splice(i, 1);
            i--;
        }
        if (members[i][0] != ' ') {
            members[i] = ' ' + members[i]
        }
    }
    return members;
}

function assignment(array, string, num1, num2) {
    let result;
    if (string == 'teamCount') {
        result = [];
        for (let i = 0; i < num1; i++) {
            result[i] = [];
            for (let j = (i*num2); j < (i*num2)+num2; j++) {
                if (array[j]) {
                    result[i].push(array[j]);
                }
            }
        }
    } else if (string == 'perTeam') {
        result = [];
        for (let i = 0; i < num2; i++) {
            result[i] = [];
            for (let j = (i*num1); j < (i*num1)+num1; j++) {
                if (array[j]) {
                    result[i].push(array[j]);
                }
            }
        }
    }
    return result
}

module.exports = {assignment, fix};