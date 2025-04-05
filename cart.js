let obj={
    arr:[],
    add: function(){
      this.arr.push("Apple")
      this.arr.push("Banana")
      this.arr.push("Bread")
      this.arr.push("Milk")
      return this.arr
    },
    remove: function(){
      let a1=this.arr.pop()
      return a1
    },
    totalItems:function(){
      let count=0;
      for(let i=0; i<this.arr.length; i++){
        count++
      }
      return count
    },
    // display: function(){
    //   console.log("totalItems:"+ this.totalItems())
    //   console.log("items:"+ this.add())
    //   console.log("removedItmes"+ this.remove())
    // }
  }
  
  
  let arr1=obj.add()
  let reduce=obj.remove()
  let item=obj.totalItems()
  console.log("totalItems:"+ item)
  console.log("items:"+ reduce)
  console.log("removeditem:"+reduce)