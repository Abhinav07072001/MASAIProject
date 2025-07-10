// 1. Constructor function Animal
function Animal() {
  this.type = "Animal";
}

// 2. Add method to Animal prototype
Animal.prototype.sound = function() {
  console.log("Animal sound");
};


function Dog() {
  Animal.call(this); // Call Animal constructor inside Dog
}

// 4. Inherit Animal's prototype
Dog.prototype = Object.create(Animal.prototype);


Dog.prototype.sound = function() {
  console.log("Bark");
};


const myDog = new Dog();


myDog.sound();  
