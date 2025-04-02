function pinetree(n){
    let temp=""
    for(let i=1; i<=n-1; i++){
      for(let j=n-1-i; j>0; j--){
        temp+=" "
      }
      for(let j=1; j<=(2*i)-1; j++){
        temp+="*"
      }
      temp+='\n'
    }
    for(let j=0; j<=Math.floor(n/2); j++){
      temp+=" "
    }
    temp+="|"
    console.log(temp)
  }
  pinetree(5)