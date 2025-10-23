// mathUtils.solution.js
// Solution file for "Methods and Functions" lesson challenge
// Demonstrates: parameters, default values, return values, arrow functions, passing functions as parameters

// 1) add: takes two parameters and returns their sum
function add(a, b) {
  return a + b;
}

// 2) multiply: second parameter defaults to 1
function multiply(a, b = 1) {
  return a * b;
}

// 3) square: arrow function that returns the square of a number
const square = (n) => n * n;

// 4) calculate: accepts another function and two numbers, then applies the function
// Robust approach: always call fn with both arguments. The target function can ignore extras or use defaults.
function calculate(fn, a, b) {
  if (typeof fn !== 'function') {
    throw new TypeError('First argument to calculate must be a function');
  }
  return fn(a, b);
}

// 5) Demonstration / test cases
if (require.main === module) {
  console.log('add(2, 3) ->', add(2, 3)); // 5
  console.log('multiply(5) ->', multiply(5)); // 5 (uses default b = 1)
  console.log('multiply(5, 4) ->', multiply(5, 4)); // 20
  console.log('square(6) ->', square(6)); // 36

  console.log('calculate(add, 7, 8) ->', calculate(add, 7, 8)); // 15
  console.log('calculate(multiply, 7, 8) ->', calculate(multiply, 7, 8)); // 56
  console.log('calculate((x, y) => x - y, 10, 3) ->', calculate((x, y) => x - y, 10, 3)); // 7

  // calculate used with a single-argument function (square)
  console.log('calculate(square, 4, 100) ->', calculate(square, 4, 100)); // 16
}

// Export functions so other files can require this module (CommonJS)
module.exports = { add, multiply, square, calculate };