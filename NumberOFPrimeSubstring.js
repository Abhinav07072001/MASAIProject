function substring(str){
    let count=0;
    for(let i=0; i<str.length; i++){
      for(let j=i; j<str.length; j++){
        let substr=str.substring(i, j+1)
        let len=substr.length
        // if(temp<=1) continue
        if(len>1 && IsPrime(len)){
          count++
        }
      }
    }
    return count
  }
  
  function IsPrime(len){
    if(len< 2) return false
    for(let i=2; i*i<=len; i++){
      if(len%i==0) return false
    }
    
    return true
  }
  
  let str="masai"
  let ans=substring(str)
  console.log(ans)