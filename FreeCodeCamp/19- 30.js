// Step 19

// When an array holds values, or elements, those values are separated by commas. Here is an array that holds two strings:
// Example Code

// let array = ["first", "second"];

// Change your rows declaration to be an array with the strings "Naomi", "Quincy", and "CamperChan". The order of values in an array is important, so follow that order. Remember that strings are case-sensitive.

let character = 'Hello';
let count = 8;
let rows = ["Naomi", "Quincy", "CamperChan"];

// Step 20

// You can access the values inside an array using the index of the value. An index is a number representing the position of the value in the array, starting from 0 for the first value.

// You can access the value using bracket notation, such as array[0].

// Use console.log and bracket notation to print the first value in your rows array.

let character1 = 'Hello';
let count2 = 8;
let rows2 = ["Naomi", "Quincy", "CamperChan"];
console.log(rows[0]);

// Step 21

// Arrays are special in that they are considered mutable. This means you can change the value at an index directly.

// For example, this code would assign the number 25 to the second element in the array:
// Example Code

// let array = [1, 2, 3];
// array[1] = 25;
// console.log(array); // prints [1, 25, 3]

// Update the third element of your rows array to be the number 10. Then print the rows array to your console.

rows[2] = 10;
console.log(rows);

// Step 22

// Notice how the value inside your rows array has been changed directly? This is called mutation. As you learn more about arrays, you will learn when to mutate an array, and when you should not.

// Before moving on, this is a great opportunity to learn a common array use. Currently, your code accesses the last element in the array with rows[2]. But you may not know how many elements are in an array when you want the last one.

// You can make use of the .length property of an array - this returns the number of elements in the array. To get the last element of any array, you can use the following syntax:
// Example Code

// array[array.length - 1]

// array.length returns the number of elements in the array. By subtracting 1, you get the index of the last element in the array. You can apply this same concept to your rows array.

// Update your rows[2] to dynamically access the last element in the rows array. Refer to the example above to help you.

// You should not see anything change in your console.

rows[2] = 10;
rows[rows.length - 1];
console.log(rows.length);

// Step 24

// In the last few steps, you learned all about working with arrays. Take a moment to review what you have learned.

// Start by declaring a cities variable and initializing it as an array of the strings "London", "New York", and "Mumbai". Then log that variable to the console.

// After logging, change the last element of cities to the string "Mexico City", then log the cities variable again.

// When done correctly, you should see this output in the console.

let cities = ["London", "New York", "Mumbai"];
console.log(cities);
cities [2] = "Mexico City";
console.log(cities);

// Step 26

// A method in JavaScript is a function that's associated with certain values or objects. An example you've already encountered is the .log() method, which is part of the console object.

// Arrays have their own methods, and the first you will explore is the .push() method. This allows you to "push" a value to the end of an array. Here is an example to add the number 12 to the end of an array:
// Example Code

// array.push(12);

// Use .push() to add the string "freeCodeCamp" to the end of your rows array. Add this code before your console.log so you can see the change you made to your array.

