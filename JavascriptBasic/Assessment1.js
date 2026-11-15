/**
 * Create an array called expenses that contains at least 5 different expense amounts.
 * Calculate the total expenses by summing all the elements of the array.
 * Find the highest and lowest individual expenses within the array.
 */

const expenses = [250, 500, 1200, 750, 300, 1500];

// Calculate the total expenses by summing all the elements of the array
let summAllElements = expenses.reduce((accumulator,currentValue) => {return accumulator+currentValue},0);
console.log("Summation of all Elements:", summAllElements);

// Find the highest and lowest individual expenses within the array.
let sortedValues = expenses.sort((a, b) => a - b);
console.log("Highest Expense =",sortedValues[0]," and Lowest Expense =",sortedValues[sortedValues.length-1]);