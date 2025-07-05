function multiplyNumber(a, b){
    const multiplier= {
      product: function(a,b){
        return a*b;
      }
    };
    
    return multiplier.product.apply(null , [a,b]);
  }
  
  console.log(multiplyNumber(5,4))