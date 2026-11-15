
/*
========================================================
       DIFFERENCE BETWEEN JAVASCRIPT LOOPS
========================================================

1. WHILE LOOP
--------------------------------------------------------
- Checks the condition BEFORE executing the code.
- Executes zero or more times.
- You need to manually initialize and update the counter.
- Best when you don't know how many times the loop
  needs to execute.

Example:
let count = 1;

while (count <= 5) {
    console.log(count);
    count++;
}


2. DO-WHILE LOOP
--------------------------------------------------------
- Executes the code FIRST and checks the condition LAST.
- Always executes at least ONCE.
- You need to manually initialize and update the counter.
- Best when you want the code to execute at least once,
  regardless of the initial condition.

Example:
let count = 1;

do {
    console.log(count);
    count++;
} while (count <= 5);


3. FOR LOOP
--------------------------------------------------------
- Checks the condition BEFORE each execution.
- Executes zero or more times.
- Initialization, condition and increment/decrement
  are written together in one statement.
- Best when you know the number of iterations.
- Gives you control over the index and iteration.

Example:
for (let i = 1; i <= 5; i++) {
    console.log(i);
}


4. FOREACH LOOP
--------------------------------------------------------
- Used specifically to iterate through array elements.
- Executes a callback function for each array element.
- No need to manually initialize or update a counter.
- Best when you want to perform an operation on every
  element of an array.
- Cannot use break or continue directly.
- Does not return a new array.

Example:
const browsers = ["Chrome", "Firefox", "Edge"];

browsers.forEach(browser => {
    console.log(browser);
});


========================================================
              QUICK COMPARISON TABLE
========================================================

FEATURE             WHILE   DO-WHILE   FOR          FOREACH
------------------------------------------------------------
Condition check     First   Last       First        Each element
Minimum execution   0       1          0            0
Counter management  Manual  Manual     Built-in     Automatic
Array iteration     Yes     Yes        Yes          Yes
Index control       Manual  Manual     Yes          Optional
Break support       Yes     Yes        Yes          No
Continue support    Yes     Yes        Yes          No
Best use            Unknown At least   Known        Every array element
                    repeats once       repeats

Note:
- forEach can access the index through its second
  callback parameter, but it does not give the same
  loop-control flexibility as a regular for loop.
- forEach skips empty array slots.


========================================================
             EASY WAY TO REMEMBER
========================================================

WHILE:
Check condition -> Execute code -> Repeat

DO-WHILE:
Execute code -> Check condition -> Repeat

FOR:
Initialize -> Check condition -> Execute code
          -> Increment/Decrement -> Repeat

FOREACH:
Take first array element -> Execute callback
                          -> Take next element
                          -> Repeat until array ends


========================================================
             QA / PLAYWRIGHT USE CASES
========================================================

WHILE:
Repeat checking until a condition is satisfied.

DO-WHILE:
Execute an operation at least once before checking
the condition.

FOR:
Execute tests using a fixed number of iterations
or access array elements using their indexes.

FOREACH:
Iterate through browser names, test data, test results,
or other arrays and perform an operation on each element.


========================================================
                 KEY TAKEAWAY
========================================================

while     = Condition-based repetition.
do-while  = Execute at least once, then check.
for       = Controlled repetition using an index/counter.
forEach   = Process every element in an array.

========================================================
*/

let counter = 1
while (counter <= 5) {
    console.log(counter);
    counter++;
}
console.log();

let count = 1;

do {
    console.log(count);
    count++;
} while (count <= 5);
console.log(count); // returns 6

console.log();
for (let count = 1; count <= 5; count++) {
    console.log(count);
}

console.log();
// Program: From 1 to 20 give me common multiple values of 2 and 5
var n = 0;
for (let k = 1; k <= 100; k++) {
    if (k % 2 == 0 && k % 5 == 0) {
        console.log(k);
        n++;

        if (n == 3)
            console.log('Nested Loop');
    }
    if (n == 5)
        break;
}