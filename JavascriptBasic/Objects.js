const employee = {
    name: "John",
    last: "Lakshakar",
    age: 30,
    role: "QA Architect",
    experience: 13
};

console.log(employee);
console.log(employee.role);
console.log(employee['age']);

employee.name = 'Tanuj';
console.log(employee['name']);
employee.gender = 'Male';
employee.age = 37;
console.log(employee);

delete employee.gender;
console.log(employee);

// to check if property present in object
var isGenderPresent = 'gender' in employee;
var isAgePresent = 'age' in employee;
console.log("isGenderPresent:",isGenderPresent);
console.log("isAgePresent:",isAgePresent);

// Print all values of javascript object
for(let key in employee) {
    console.log(employee[key]);
}
console.log();

const employee1 = {
    name: "John",
    last: "Lakshakar",
    age: 30,
    role: "QA Architect",
    experience: 13,
    fullName: function() {
        return this.name + ' ' + this.last;
    }
};

// Print all values of javascript object
for (let key in employee1) {
    if (typeof employee1[key] === "function") {
        console.log(employee1[key]());
    } else {
        console.log(employee1[key]);
    }
}