//S1 person constructor
function Person(name, age){
  this.name=name;
  this.age=age;
} 

// Step 2: Add introduce method to Person.prototype
Person.prototype.introduce=function () {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
}

// Step 3: Employee Constructor - Inherit from Person
function employee(name, age,jobtitle){
  Person.call(this, name, age);
  this.jobtitle=jobtitle;
}

// Step 4: Set up inheritance (prototypal)
employee.prototype= Object.create(Person.prototype);

// Step 5: Reset constructor to Employee
employee.prototype.constructor= employee

// Step 6: Add work method to Employee.prototype
employee.prototype.work= function (){
  console.log(`${this.name} as working as a ${this.jobtitle}`)
};

// Step 7: Demonstration

// Create instance of Person
const person1= new Person("abhi", 23);
person1.introduce();

// Create instance of Employee
const employee1=new employee('anjul', 23, 'software developer');
employee1.work()
