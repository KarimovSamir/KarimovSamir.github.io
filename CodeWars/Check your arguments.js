// Bob has written a function to detect the type of an object. It receives any primitive values or objects, and returns its object type as a string. But it seems to be working incorrectly. Can you figure out why, and fix the code for him?

function objectType(obj) { //if no arguments are passed, defaults to null
    if (arguments.length === 0) {
        obj = null;
    }
    if (typeof(obj) === undefined) {
          obj = undefined;
    }
    
    return Object.prototype.toString.call(obj);
}

let sam = "stringolino";
console.log(objectType());
