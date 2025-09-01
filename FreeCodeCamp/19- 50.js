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

let rows = ["Naomi", "Quincy", "CamperChan"];
rows.push("freeCodeCamp");
console.log(rows);

// Step 27

// Another method essential for this project is the .pop() method. It removes the last element from an array and returns that element.

// When a method returns a value, you can think of it as giving the value back to you, making it available for use in other parts of your code.

// Create a new variable called popped and assign it the result of rows.pop(). Then, log popped to the console.

let rows = ["Naomi", "Quincy", "CamperChan"];
rows.push("freeCodeCamp");
let popped;
popped = rows.pop();
console.log(popped);

// Step 28

// You should have seen "freeCodeCamp" printed to the console. This is because .pop() returns the value that was removed from the array - and you pushed "freeCodeCamp" to the end of the array earlier.

// But what does .push() return? Assign your existing rows.push() to a new pushed variable, and log it.

rows.push("freeCodeCamp");
let pushed = rows.push();
console.log(rows);
console.log(pushed);

// Шаг 31

// Объявление переменной с помощью ключевого слова let позволяет ей быть переназначенной. Это значит, что позже вы можете изменить character на совершенно другое значение.

// В этом проекте вам не нужно изменять эти переменные. Поэтому вместо let следует использовать const. Переменные, объявленные через const, являются особенными.

// Во-первых, переменная const не может быть переназначена, как переменная let. Такой код вызовет ошибку:

// Замените ваши ключевые слова let на const.

const character3 = "Hello";
const count3 = 8;
const rows3 = [];

// Step 38

// You should see the numbers zero through seven printed in your console, one per line. This will serve as the foundation for generating your pyramid.

// Replace your log statement with a statement to push i to your rows array.

const character4 = "#";
const count4 = 8;
const rows = [];

for (let i = 0; i < count; i = i + 1) {
  rows.push(i);
}

// Step 41

// To manipulate the result string, you will use a different type of loop. Specifically, a for...of loop, which iterates over each item in an iterable object and temporarily assigns it to a variable.

// The syntax for a for...of loop looks like:
// Example Code

// for (const value of iterable) {

// }

// Note that you can use const because the variable only exists for a single iteration, not during the entire loop.

// Create a for...of loop to iterate through your rows array, assigning each value to a row variable.

const rows = [];

for (const row of rows) {

}

// Step 43

// Now all of your numbers are appearing on the same line. This will not work for creating a pyramid.

// You will need to add a new line to each row. However, pressing the return key to insert a line break between quotes in JavaScript will result in a parsing error. Instead, you need to use the special escape sequence \n, which is interpreted as a new line when the string is logged. For example:
// Example Code

// lineOne = lineOne + "\n" + lineTwo;

// Use a second addition operator to append a new line after the result and row values.

for (const row of rows) {
  result = result + row + "\n";
}

// Step 45

// Now you have a series of # characters, but the pyramid shape is still missing. Fortunately, the i variable represents the current "row" number in your loop, enabling you to use it for crafting a pyramid-like structure.

// To achieve this, you will use the .repeat() method available to strings. This method accepts a number as an argument, specifying the number of times to repeat the target string. For example, using .repeat() to generate the string "Code! Code! Code!":
// Example Code

// const activity = "Code! ";
// activity.repeat(3);

// Use the .repeat() method on your character, and give it i for the number.


for (let i = 0; i < count; i = i + 1) {
  rows.push(character.repeat(i));
}