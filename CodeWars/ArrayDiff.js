// Implement a function that computes the difference between two lists. The function should remove all occurrences of elements from the first list (a) that are present in the second list (b). The order of elements in the first list should be preserved in the result.
// Examples

// If a = [1, 2] and b = [1], the result should be [2].

// If a = [1, 2, 2, 2, 3] and b = [2, 4], the result should be [1, 3].

function arrayDiff(arr1, arr2) {
    let finalArr = [];
    let testArr = [];
    
    if (arr2.length === 0) {
      finalArr = arr1;
    }
  
    for (let i = 0; i < arr1.length; i++) {
        testArr = [];
        let count = 0;
        for (let i2 = 0; i2 < arr2.length; i2++) {
            if (arr1[i] != arr2 [i2]) {
                testArr.push(arr1[i]);
                count++;
            }
            if (arr1[i] === arr2 [i2]) {
                testArr = [];
                count = 0;
                break;
            }
        }
        if (count > 0) {
            finalArr.push(arr1[i]);
        }
    }
    return finalArr;
}

let arr1 = [1, 2, 5, 2, 3];
let arr2 = [5, 2];
console.log(arrayDiff(arr1, arr2));