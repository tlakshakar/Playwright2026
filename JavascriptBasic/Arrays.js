var score = Array(6)
console.log(score) // prints [ <6 empty items> ]

let marks = new Array(111,20,30,40,50,60);
console.log(marks); // prints [ 111, 20, 30, 40, 50, 60 ]

marks.push(70) // Adds element at last
console.log(marks); // prints [ 111, 20, 30, 40, 50, 60, 70 ]

console.log("Array Length:",marks.length); // Find the array length

marks[0] = 10; // Update an element
console.log(marks); // prints [ 10, 20, 30, 40, 50, 60, 70 ]

marks.pop(); // Removes element from last
console.log(marks) // prints [ 10, 20, 30, 40, 50, 60 ]

marks.shift(); // Remove from the beginning
console.log(marks); // prints [ 20, 30, 40, 50, 60 ]

marks.unshift(44) // Add element at the beginning of the array
console.log(marks); // prints [ 44, 20, 30, 40, 50, 60 ]

////////////////////////////////////////////////////////////////////////

/**
 * Methods to search elements
 */

var indexOf50 = marks.indexOf(50); // Finds the position of an element
console.log(indexOf50); // Prints 4

// includes() - Checks whether an element exists in Array
console.log(marks.includes(44));
console.log(marks.includes(55));

marks.unshift(55); // Add at 1st position
console.log(marks)
marks.push(55);
console.log(marks) // Add at last position

console.log(marks.find(marks => marks > 55)) // Find an element based on a condition
console.log(marks.findIndex(marks => marks >= 55)) // 0 - Find its position (position of element which is matching the condition)
console.log(marks.findIndex(marks => marks > 60)) // -1 - Find its position (position of element which is matching the condition)
console.log(marks.findIndex(marks => marks > 55)) // 6 - Find its position (position of element which is matching the condition)

////////////////////////////////////////////////////////////////////////

/**
 * Methods to extract and modify elements
 */

marks.unshift(66); // Add at 1st position
marks.push(77);
marks.unshift(33); // Add at 1st position
marks.push(88);
console.log(marks)

newArr = marks.slice(3, 8) // Extracts a portion of an array and create a new array. Original array remains unchanged
console.log(newArr);
console.log(marks); // Original array remains unchanged

// Sum all elemnets in array
var sum = 0;
for(let i = 0 ; i < marks.length ; i++) {
    console.log(marks[i]);
    sum = sum + marks[i];
}
console.log("Sum:",sum)

//////////////////////////////////////////////////////////////////////////////////

// splice() - Adds, removes, or replaces elements in the original array.
// use the splice() method to insert an element at a particular index in an array.
// array.splice(index, 0, element);
// array.splice(index, numberOfElementsToRemove, newValue);
// - index – Position where you want to insert.
// - 0 – Number of elements to delete (zero means don't delete anything).
// element – Value you want to insert.

const studentNames = ["David", "John", "Priya", "Rahul", "Sneha"];
// Insert a name at index 2
studentNames.splice(2, 0, "Amit");
console.log(studentNames);

let browsers = ["Chrome", "Firefox", "Edge", "Safari"];
// Remove one element starting at index 1
browsers.splice(1, 1);
console.log(browsers); // ["Chrome", "Edge", "Safari"]

const fruits = ["Apple", "Banana", "Mango", "Orange"];
// Replace Banana with Grapes
fruits.splice(1, 1, "Grapes");
console.log(fruits); // ["Apple", "Grapes", "Mango", "Orange"]

//////////////////////////////////////////////////////////////////////////////////

// some() - Checks whether at least one element matches a condition
// every() - Checks whether all elements match a condition

const scores = [60, 80, 40];
console.log(scores.some(score => score >= 50)); // true (at least one score is >= 50)
console.log(scores.every(score => score >= 50)); // false (not every score is >= 50)