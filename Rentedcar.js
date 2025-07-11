// Step 1: Car Constructor
function Car(make, model, year, isAvailable = true) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.isAvailable = isAvailable;
}

// Step 2: Customer Constructor
function Customer(name) {
  this.name = name;
  this.rentedCars = [];
}

// Step 3: Add rentCar method to Customer prototype
Customer.prototype.rentCar = function (car) {
  if (car.isAvailable) {
    car.isAvailable = false;
    this.rentedCars.push(car);
    console.log(`${this.name} has rented a ${car.make} ${car.model}.`);
  } else {
    console.log(`Sorry, the ${car.make} ${car.model} is already rented.`);
  }
};

// Step 4: PremiumCustomer Constructor inheriting from Customer
function PremiumCustomer(name, discountRate) {
  Customer.call(this, name); // call super constructor
  this.discountRate = discountRate;
}
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;

// Step 5: Rental Price Calculator
function calculateRentalPrice(car, days, discountRate = 0) {
  const baseRate = 50;
  let total = baseRate * days;
  if (discountRate > 0) {
    total = total - total * discountRate;
  }
  console.log(
    `Rental for ${car.make} ${car.model} for ${days} day(s) = $${total}`
  );
  return total;
}

// Step 6: Maintenance Function (simulate delay)
function Maintenance(car, delayInMs) {
  console.log(`Maintenance started for ${car.make} ${car.model}`);
  setTimeout(() => {
    car.isAvailable = true;
    console.log(`${car.make} ${car.model} is now available for rent again.`);
  }, delayInMs);
}

// Cars
const car1 = new Car("Toyota", "Corolla", 2020);
const car2 = new Car("Honda", "Civic", 2022);
const car3 = new Car("Hyundai", "i20", 2021);

// Customers
const cust1 = new Customer("Abhinav");
const cust2 = new PremiumCustomer("Anjul", 0.1);

// Renting
cust1.rentCar(car1); // success
cust2.rentCar(car1); // already rented

// Premium customer renting another car
cust2.rentCar(car2);

// Price calculation
calculateRentalPrice(car2, 3); // no discount
calculateRentalPrice(car2, 3, cust2.discountRate); // with discount

// Maintenance (simulated with delay)
Maintenance(car1, 2000); // will be available after 2 seconds

// Bind example: reusing rentCar with bind
const rent = cust1.rentCar.bind(cust1);
rent(car3); // using bind
