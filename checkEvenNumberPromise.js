function checkEvenNumber(num) {
  return new Promise((resolve, reject) => {
    if (typeof num === 'number') {
      if (num % 2 === 0) {
        resolve(`${num} is even`);
      } else {
        reject(`${num} is odd or invalid`);
      }
    } else {
      reject(`${num} is odd or invalid`);
    }
  });
}
checkEvenNumber(4)
  .then(console.log)      // Output: "4 is even"
  .catch(console.error);

checkEvenNumber(5)
  .then(console.log)
  .catch(console.error);  // Output: "5 is odd or invalid"

checkEvenNumber("hello")
  .then(console.log)
  .catch(console.error);  // Output: "hello is odd or invalid"
