/**
 * Variable - In JavaScript, the type of value a variable holds is determined at runtime.
 * - var [ES5]
 * - let [ES6]
 * - const [ES6]
 * - Null
 * - Undefined
 */


/*
========================================
JAVASCRIPT: var vs let vs const
========================================

1. var
   - Can reassign values.
   - Can redeclare variables.
   - Function-scoped.
   - Older way of declaring variables.

   Example:
*/

var age = 25;
age = 30;           // Allowed
var age = 35;       // Allowed

/*
2. let
   - Can reassign values.
   - Cannot redeclare in the same scope.
   - Block-scoped.

   Example:
*/

let score = 50;
score = 80;         // Allowed
// let score = 90;  // Error

/*
3. const
   - Cannot reassign values.
   - Cannot redeclare in the same scope.
   - Block-scoped.
   - Must be initialized during declaration.

   Example:
*/

const browser = "Chrome";
// browser = "Firefox"; // Error

/*
========================================
QUICK COMPARISON
========================================

Feature              var       let       const
------------------------------------------------
Reassign value       Yes       Yes       No
Redeclare            Yes       No        No
Scope                Function  Block     Block
Initialization       Optional  Optional  Mandatory

========================================
IMPORTANT POINTS
========================================

1. Scope means where a variable can be accessed.

2. Block scope means the variable is accessible only inside the { } block.

3. Function scope means the variable is accessible throughout the function in which it is declared.

4. Prefer const by default.

5. Use let when the value needs to change.

6. Avoid var in modern JavaScript.

========================================
EASY WAY TO REMEMBER
========================================

var   = Can reassign + Can redeclare
let   = Can reassign + Cannot redeclare
const = Cannot reassign + Cannot redeclare

========================================
QA / PLAYWRIGHT RECOMMENDATION
========================================

Use const for values that do not need reassignment.
Use let for values that change during test execution.
Avoid var in modern JavaScript.
========================================
*/

var str = "Tanuj Lakshakar"
let role = "QA Architect"
console.log(str,role)

// To get to know what is the datatype of variable, use `typeof`
var x=10,y=235.56,required=true
console.log('Actual Value of required:',required)
console.log('Negation of required:',!required)
const x_dataType = typeof(x)
console.log('datatypeof variable x:',x_dataType)
console.log('datatypeof variable y:',typeof(y))
let z=595.48
const z_dataType = typeof(z)
console.log('datatypeof variable z:',z_dataType)
const required_dataType = typeof(required)
console.log('datatypeof variable required:',required_dataType)

// Concate variables
var c = x+y+z;
console.log(c)


// const
const flag=true
if (flag) { 
    console.log("Condition Satisfied!")
} else {
    console.log("Condition Not Satisfied!")
}

/**
 * Understanding !flag:
- ! is the NOT (logical negation) operator.
- It reverses the Boolean value only for the condition being evaluated.
- It does NOT change or reassign the original value stored in flag.
- It does NOT create a new variable.
- The original value of flag remains true.
 */

if (!flag) { 
    console.log("Condition Satisfied!")
} else {
    console.log("Condition Not Satisfied!")
}