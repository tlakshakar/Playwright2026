
/*
====================================================
       JAVASCRIPT: map() vs filter() vs reduce()
====================================================

1. filter() - SELECT ELEMENTS
array.filter(callback(element, index, arr), thisValue)
    - element – Current value being checked.
    - index – Position of the current element (starts from 0).
    - arr – Original array.
    - thisValue – Optional value used as this inside the callback.
----------------------------------------------------
WHEN TO USE:
- When you want to select elements based on a condition.
- Returns a NEW ARRAY containing matching elements.
- Original array remains unchanged.

EXAMPLE:
*/

const numbers1 = [10, 15, 20, 25, 30];

const evenNumbers1 = numbers1.filter(num => num % 2 === 0);

console.log(evenNumbers1);
// Output: [10, 20, 30]


/*
2. map() - TRANSFORM ELEMENTS
----------------------------------------------------
WHEN TO USE:
- When you want to modify or transform every element.
- Returns a NEW ARRAY.
- Usually maintains the same number of elements.
- Original array remains unchanged.

EXAMPLE:
*/

const numbers2 = [10, 20, 30, 40];

const doubledNumbers = numbers2.map(num => num * 2);

console.log(doubledNumbers);
// Output: [20, 40, 60, 80]


/*
3. reduce() - COMBINE ELEMENTS
----------------------------------------------------
WHEN TO USE:
- When you want to combine array elements into one final result.
- Commonly used for totals and calculations.
- Can return a number, string, array or object.

EXAMPLE:
*/

const numbers3 = [10, 20, 30, 40];

const total = numbers3.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
}, 0);

console.log(total);
// Output: 100


/*
====================================================
             QUICK COMPARISON
====================================================

filter() = SELECT elements based on a condition.
           Example: Get only failed test cases.

map()    = TRANSFORM every element.
           Example: Convert browser names to uppercase.

reduce() = COMBINE elements into one result.
           Example: Calculate total execution time.


====================================================
             QA / PLAYWRIGHT EXAMPLES
====================================================

filter() = Get only failed test cases.
map()    = Extract test case IDs from test data.
reduce() = Calculate total test execution time.


====================================================
             EASY WAY TO REMEMBER
====================================================

filter() = I WANT SOME ELEMENTS.
map()    = I WANT TO MODIFY EVERY ELEMENT.
reduce() = I WANT ONE FINAL RESULT.

====================================================
*/


/**
 * Methods to process array elements
 */

// reduce() - Combines all elements into one result. Calculate a single result from all array elements.
// The reduce() method takes all elements of an array, processes them one by one, and combines them into a single final result.
/**
 * The reduce() method takes in:

callback - The callback function to execute on each array element (except the first element if no initialValue is provided). It takes in
accumulator - It accumulates the callback's return values. Stores the result calculated so far
currentValue - The current element being passed from the array. The current array element being processed.
initialValue (optional) - A value that will be passed to callback() on first call. If not provided, the first element acts as the accumulator on the first call and callback() won't execute on it.
 */

console.log();
var marks = [23, 95, 4, 65, 74, 18, 60, 1, 35, 15, 45];
var totalSum = marks.reduce((sum, mark) => {
    return sum + mark // Similar to sum + marks[i] in for-loop
}, 0); // 0 means sum=0
console.log("TotalSum:", totalSum)

const message = ["JavaScript ", "is ", "fun."];
// join each string elements
let joinedString = message.reduce((accumulator, currentValue) => {
    return accumulator + currentValue
});
console.log("Output:", joinedString)

// Subtracting Numbers in Array
const numbers = [1800, 50, 300, 20, 100]; // 1800 - 50 - 300 - 20 - 100 = 1330
let subtractedOutput = numbers.reduce((accumulator, currentValue) => {
    return accumulator - currentValue
})
console.log("Subtracted Output:", subtractedOutput) // 1330

// Remove Duplicate Items from Array
let ageGroup = [18, 21, 1, 1, 51, 18, 21, 5, 18, 7, 10];
let uniqueAgeGroup = ageGroup.reduce((accumulator, currentValue) => {
    if (accumulator.indexOf(currentValue) === -1) {
        accumulator.push(currentValue)
    }
    return accumulator
}, []); // Passing initialValue as an empty array where I am expecting to store calculated value so farby processing array elements
console.log("Unique Age Group:", uniqueAgeGroup); // [ 18, 21, 1, 51, 5, 7, 10 ]

// Print even numbers - Using reduce()
let evenNumbers = marks.reduce((accumulator, currentValue) => {
    if (currentValue % 2 === 0) {
        accumulator.push(currentValue);
    }
    return accumulator
}, []);
console.log("Even Numbers:", evenNumbers);

// Print even numbers - using filter()
// array.filter(callback(element, index, arr), thisValue)
let en = marks.filter((n) => n % 2 == 0);
console.log("Filter: ", en)

const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = words.filter((word) => word.length > 6);
console.log(result);

const filtered = [12, 5, 8, 130, 44].filter((n) => n > 10)
console.log(filtered);

// Find all prime numbers in an array
let allNo1 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];
let allNo2 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];
let allNo3 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];
let allNo4 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];

// Using reduce()
let primeNo1 = allNo1.reduce((accumulator, currentValue) => {
    if (currentValue % 2 !== 0) {
        accumulator.push(currentValue);
    }
    return accumulator;
}, []);
console.log("Prime Numbers:", primeNo1);

// Using filter()
let primeNo2 = allNo2.filter((num) => {
    if (num % 2 !== 0) {
        return num;
    }
});
console.log("Prime Numbers:", primeNo1);

let primeNo3 = allNo3.filter((currentValue,indexOfCurrentValue,originalArray) => {
    console.log("Original Array:",originalArray);
    if(currentValue %2 !== 0) {
        console.log("Element:", currentValue, "Index:", indexOfCurrentValue);
        return currentValue;
    }
});
console.log("Prime Numbers:", primeNo3);

// map() - Modify or transform every element and returns a NEW ARRAY.
// Print prime numbers and multiply each value by 5
let primeNo4 = allNo4.filter((num,index) => {
    if(num%2 !== 0) {
        return num;
    }
});
console.log("Prime Numbers multiplied by 5:",primeNo4.map((num) => {return num * 5}));

// Print prime numbers and multiply each value by 5 and at last sum them all
let allNo5 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];
let filterPrimeNo = allNo4.filter((num) => {
    if(num % 2 !== 0) {
        return num;
    }
});
let mapToArr = filterPrimeNo.map((num) => num * 5);
let reduceToSingleResult = mapToArr.reduce((accumulator,currentValue) => {
    return accumulator + currentValue;
},0);
console.log("Total Output:", reduceToSingleResult);

// Chaining to single statement- filter,map,reduce
let allNo6 = [2, 5, 8, 11, 15, 17, 20, 23, 25, 29];
let output = allNo4.filter((num) => {
    if(num % 2 !== 0) {
        return num;
    }
}).map((num) => num * 5).reduce((accumulator,currentValue) => {
    return accumulator + currentValue;
},0);
console.log("Total Output:", output);