function add(a, b) {
    return a + b;
}
console.log("Sum :", add(2, 8));

// Anonymous Function
var sum1 = function(a, b) {
    return a + b;
};
console.log("Addition1 :", sum1(9, 1));

// Anonymous Function
var sum2 = (a, b) => a + b;
console.log("Addition2 :", sum2(5, 6)); 

