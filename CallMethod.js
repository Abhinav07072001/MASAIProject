function personInfo(){
    console.log("Name",  this.name)
    console.log("Age",  this.age)
  }
  
  const person={
    name: "Abhinav",
    age: 23
  };
  
  personInfo.call(person);