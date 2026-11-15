/**
 * Making this class publically available to export anywhere.
 * As a practice, I am calling this class under ./CallExportedClass.js file
 */

module.exports = class Employee {

    // constructor(){}

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    get location() { // Another way of defining property. This is not a getter method like we have Java
        return "India";
    }
    
    // This fullName is a function/method
    fullName() {
        return this.firstName + " " + this.lastName;
    }

}