// This kata is about multiplying a given number by eight if it is an even number and by nine otherwise.

function simpleMultiplication(number) {
    // 4%2 - 0
    // 5%2 - 1
    return number % 2 === 0 ? number * 8 : number * 9;
}

console.log(simpleMultiplication(2));