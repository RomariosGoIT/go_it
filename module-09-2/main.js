'use strict';

// const promise = new Promise((onResolve, onReject) => {
//   setTimeout(() => {
//     onResolve(5);
//     // onReject('promise rejected!')
//   }, 1000);
// });

// const resolved = value => {
//   console.log(value);
//   return value * 2;
// };
// const rejected = err => console.log(err);

// promise
//   .then(value => {
//     console.log('first promise', value);
//     const newPromise = new Promise(resolve => {
//       setTimeout(() => {
//         resolve(value * 5);
//       }, 2000);
//     });
//     return newPromise;
//   })
//   .then(resolved)
//   .then(resolved)
//   .catch(rejected);

// const checkNumber = num => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (num % 2 === 0) {
//         resolve('Even!! Success!!');
//       }
//         reject('Odd!! Fail!!!');
//     }, 1000);
//   });
// };

// const promise = checkNumber(10);

// promise.then(result => console.log(result)).catch(err => console.log(err));
//======================================

const DISTANCE = 1000;

const race = (name, speed) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(`[${name}] crossed the finish line!`);
    }, (DISTANCE / speed) * 1000);
  });

const derby = race('Derby', 300);
const marty = race('Marty', 700);
const john = race('John', 900);


// Promise.all([derby, john, marty]).then(arr => console.log(arr))
Promise.race([derby, john, marty]).then(result => console.log(result));
