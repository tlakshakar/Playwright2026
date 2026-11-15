/**
 * As a practice, I am calling class under ./ExportClassPublicly.js with a keyword "require"
 */
let Employee = require('./ExportClassPublicly');

let employee = new Employee("Tanuj", "Architect");
console.log(employee);
// console.log(employee.name);
// console.log(employee.age);
// console.log(employee.region);
// console.log(employee.location);

const employee1 = new Employee("John", "Stark");
const employee2 = new Employee("David", "Tucker");
const employee3 = new Employee();

console.log("1:", employee1);
console.log("2:", employee2);
// console.log("3:", employee3); // { firstName: undefined, lastName: undefined }
console.log(employee2.fullName());

employee3.region = "Canada";
console.log("3:", employee3); // { firstName: undefined, lastName: undefined, region: 'Canada' }