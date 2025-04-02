function brickWallPattern(h,b){
    let temp=""
    for(let i=1; i<=h; i++){
      if(i%2==0){
        temp+=" "
      }
      for(let j=1; j<=b; j++){
        temp+="[] "
      }
      temp+='\n'
    }
    console.log(temp)
  }
  brickWallPattern(4,5)