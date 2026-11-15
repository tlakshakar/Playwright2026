/**
 * Create an array named studentNames with the names of your students.
 * Add a new student name to the beginning of the array.
 * Remove the last student name from the array.
 * Alphabetize the student names within the array.
 */

const studentNames = ["John", "David", "Priya", "Rahul", "Sneha"];
console.log(studentNames);

// Add a new student name to the beginning of the array.
studentNames.unshift("Vanessa");
console.log("Add new name to the beginning of the array:", studentNames);
// Remove the last student name from the array.
studentNames.pop();
console.log("Remove the last student name from the array:",studentNames);
// Alphabetize the student names within the array.
console.log("Alphabetize the student names within the array:", studentNames.sort());