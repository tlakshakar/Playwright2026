const browsers = ["Chrome", "Safari", "Internet Explorer", "Chromium", "Firefox", "Edge"];
// Sort - Sort() always sort Strings. JavaScript's default sort() compares values as strings, not as numbers.
console.log("Sorted Array:", browsers.sort());
console.log("Sorted Array:", browsers.reverse());

let arr = [12,19,10,0o5,13,8,20,15,11];
let output1 = arr.sort((a, b) => a - b);
console.log("Sorted Integers1:", output1);
let output2 = arr.sort((a, b) => b - a);
console.log("Sorted Integers2:", output2);