// Step 51

// Your call variable has an undefined value, even though you defined it! This is because your padRow function does not currently return a value. By default, functions return undefined as their value.

// In order to return something else, you need to use the return keyword. Here is an example of a function that returns the string "Functions are cool!":
// Example Code

// function demo() {
//   return "Functions are cool!";
// }

// Use the return keyword to have your function return the string "Hello!".

function padRow() {
    return "Hello!";
}

// Step 55

// Before moving on, take a moment to review how functions work.

// Declare a function named addTwoNumbers. This function should take two arguments and return the sum of those two arguments.

// Your function should not use hard-coded values. An example of a hard-coded function might be:
// Example Code

// function sayName(firstName, lastName) {
//   return "John Doe";
// }

// sayName("Camper", "Cat");

// This function would return "John Doe" regardless of the arguments passed to the parameters firstName, and lastName, so "John Doe" is considered a hard-coded value.

// Declare a sum variable and assign it the value of calling your addTwoNumbers function with 5 and 10 as the arguments. Log the sum variable to the console.

function addTwoNumbers (num1, num2){
    return num1 + num2;
}
  
const sum = addTwoNumbers(5, 10);
console.log(sum);

// Step 57

// Variables in JavaScript are available in a specific scope. In other words, where a variable is declared determines where in your code it can be used.

// The first scope is the global scope. Variables that are declared outside of any "block" like a function or for loop are in the global scope. Your character, count, and rows variables are all in the global scope.

// When a variable is in the global scope, a function can access it in its definition. Here is an example of a function using a global title variable:
// Example Code

// const title = "Professor ";
// function demo(name) {
//   return title + name;
// }
// demo("Naomi")

// This example would return "Professor Naomi". Update your padRow function to return the value of concatenating your character variable to the beginning of the name parameter.

function padRow(name) {
  return character + name;
}

padRow("Sam");

// Step 59

// Values returned out of a function are used by calling the function. You can use the function call directly as the value it returns, or capture the returned value in a variable. This way, you can use the value assigned to a locally scoped variable, outside the function it was created in.
// Example Code

// function getName() {
//   const name = "Camper cat";
//   return name;
// }

// console.log(getName()); // "Camper cat"

// const capturedReturnValue = getName();
// console.log(capturedReturnValue); // "Camper cat"

// console.log(name); // reference error

// To use your "Testing" value, return it out of the padRow function by updating your return statement to return only the test variable.

function padRow() {
  const test = "Testing";  
  return test;
}

console.log(padRow());