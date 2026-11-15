/**
 * You have an array called productPrices with various product prices.
 * Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices.
 * Use the filter method to create a new array called affordableProducts containing only products priced below $50
 * Calculate the total cost of all items in the affordableProducts array using the reduce method
 */

const productPrices = [499, 999, 1499, 1999, 2499, 2999];
console.log(productPrices);

// Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices
let discountedPrices = productPrices.map((value, index, arr) => { return parseFloat((value * 0.10).toFixed(2)) });
console.log("Discounted Prices:", discountedPrices);

// Use the filter method to create a new array called affordableProducts containing only products priced below $50
let affordableProducts = discountedPrices.filter((value, index, arr) => parseFloat(value) > 50);
console.log("Affordable Products:", affordableProducts);

// Calculate the total cost of all items in the affordableProducts array using the reduce method
let cost = affordableProducts.reduce((accumulator,currentValue) => {return accumulator+currentValue},0);
console.log("Total Cost:", cost);