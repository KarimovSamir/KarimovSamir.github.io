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