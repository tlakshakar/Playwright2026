/**
 * To achieve Inheritance we need to 
 * - 1st - Make the parent class as module.exports
 * - 2nd - Make the child class to access parent class by a keyword require
 */

const Employee = require("./ExportClassPublicly")
class Pet extends Employee {
    constructor(firstName, lastName) {
        super(firstName, lastName); // parent class constructor
    }
    get location() {
        return "BlueCross";
    }
}

let pet = new Pet("Richard","Parker");

console.log(pet.fullName());
console.log(pet.location);