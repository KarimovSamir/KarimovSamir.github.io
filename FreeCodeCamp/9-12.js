// Step 9

// When you declare a variable without initializing it, it is considered uninitialized. Currently, your secondCharacter variable is uninitialized.

// Add a console.log() to see what the value of your secondCharacter variable is.
let character = 'Hello';
console.log(character);
character = "World";
let secondCharacter;
console.log(secondCharacter);

// Step 10

// The default value of an uninitialized variable is undefined. This is a special data type that represents a value that does not have a definition yet.

// You can still assign a value to an uninitialized variable. Here is an example:
// Example Code

// let uninitialized;
// uninitialized = "assigned";

// Assign the string "Test" to your secondCharacter variable below your declaration. Open the console to see how your log has changed.

let character1 = 'Hello';
console.log(character);
character = "World";
let secondCharacter1;
secondCharacter = "Test";
console.log(secondCharacter);

// Step 11

// You can also assign the value of a variable to another variable. For example:
// Example Code

// let first = "One";
// let second = "Two";
// second = first;

// The second variable would now have the value "One".

// To see this in action, change your secondCharacter assignment from "Test" to your character variable.

// Then open the console to see what gets logged.

secondCharacter = character;
console.log(secondCharacter);

// Step 12

// You are now ready to declare your next variable. Remove both console.log statements, and the character reassignment.

// Also remove your secondCharacter variable, but leave the character initialization unchanged.

let character2 = 'Hello';