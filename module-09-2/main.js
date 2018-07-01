'use strict';

const promise = new Promise((onResolve, onReject) => {
  setTimeout(() => {
    // onResolve(5);
    onReject('promise rejected!')
  }, 1000);
});

const resolved = value => {
  console.log(value);
  return value * 2;
};
const rejected = err => console.log(err);

promise
  .then(resolved)
  .then(resolved)
  .then(resolved)
  .catch(rejected);
