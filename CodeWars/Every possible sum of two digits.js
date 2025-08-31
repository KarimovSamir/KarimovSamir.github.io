// Given a long number, return all the possible sum of two digits of it.

// For example, 12345: all possible sum of two digits from that number are:

// [ 1 + 2, 1 + 3, 1 + 4, 1 + 5, 2 + 3, 2 + 4, 2 + 5, 3 + 4, 3 + 5, 4 + 5 ]

// Therefore the result must be:

// [ 3, 4, 5, 6, 5, 6, 7, 7, 8, 9 ]

function digits(num){
    let numString = String(num);
    let numStringArr = numString.split("");
    let numArr = numStringArr.map(Number);
    console.log(numArr);
  
    let finalArr = [];
    for (let i = 0; i < numArr.length; i++)
    {
        if (i != 0) {
            finalArr.push(numArr[0] + numArr[i]);
        }
        if (i === numArr.length - 1){
            i = 0;
            numArr.shift();
        } 
        if (numArr.length === 1){
            break;
        }
    }
    
    return finalArr;
}

console.log(digits(12345));  
console.log(digits(6842315));  