class Employee {

    // constructor(){}

    constructor(name, age, role, region) {
        this.name = name;
        this.age = age;
        this.role = role;
    }

    get location() { // Another way of defining property. This is not a getter method like we have Java
        return "India";
    }
    get last() { // Another way of defining property. This is not a getter method like we have Java
        return "Banner";
    }
    region = "Pune";

    // This fullName is a function/method
    fullName() {
        return this.name + " " + this.last;
    }

}

let employee = new Employee("Tanuj", 37, "QA Architect");
console.log(employee);
console.log(employee.name);
console.log(employee.age);
console.log(employee.region);
console.log(employee.location);

const employee1 = new Employee("John", 30, "QA Architect");
const employee2 = new Employee("David", 28, "QA Lead");
const employee3 = new Employee();

console.log("1:",employee1);
console.log("2:",employee2);
console.log("3:",employee3);
console.log(employee2.fullName());