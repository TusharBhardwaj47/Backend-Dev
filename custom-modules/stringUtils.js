
function capitalize(str) {
    var firstChar = str[0];
    var rest = "";

    for (var i = 1; i < str.length; i++) {
        rest = rest + str[i];
    }

    return firstChar.toUpperCase() + rest;
}

function reverse(str) {
    var result = "";
   for (var i = str.length - 1; i >= 0; i--) {
        result = result + str[i];
    }

    return result;
}

function countVowels(str) {
    var count = 0;

    for (var i = 0; i < str.length; i++) {
        if (
            str[i] == 'a' || str[i] == 'e' || str[i] == 'i' ||
            str[i] == 'o' || str[i] == 'u' ||
            str[i] == 'A' || str[i] == 'E' || str[i] == 'I' ||
            str[i] == 'O' || str[i] == 'U'
        ) {
            count = count + 1;
        }
    }

    return count;
}

module.exports = {
    capitalize: capitalize,
    reverse: reverse,
    countVowels: countVowels
};
