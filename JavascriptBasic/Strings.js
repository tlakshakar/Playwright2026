let day = 'Sun day ';
// Length of String
console.log("Length:",day.length);
// SubString
console.log("Substring:", day.slice(0,4));
// Split String into 2 strings (character array)
let splitday = day.split(' ');
console.log(splitday);
console.log(splitday[0]);
console.log(splitday[1].trim()); // to remove spaces at the start/end of string

let date1 = '23'
let date2 = '25'
// Convert string to number
let output = parseInt(date2) - parseInt(date1);
console.log("Diff:",output);
console.log("Diff:",output.toString());

// concate
let neQuote = day + "is funday!";
console.log(neQuote);

// indexOf
var index = neQuote.indexOf("fun");
console.log(index);
var index = neQuote.indexOf("un",4);
console.log(index);

