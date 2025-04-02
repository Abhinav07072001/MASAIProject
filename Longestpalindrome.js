function evenAroundCenter(s,left, right){
    while(left>=0 && right<s.length && s[left]===s[right]){
      left--
      right++
    }
    return s.substring(left+1, right)
  }
  function substirngPalindrome(s){
    if(s.length<=1)return s
    let longest=""
    
    for(let i=0; i<s.length; i++){
      let odd= evenAroundCenter(s, i, i)
      let even= evenAroundCenter(s,i , i+1)
      
      let larger=odd.length > even.length ? odd : even
      
      if(larger.length>longest.length) longest=larger
      }
      
      return longest
  }
  let s="babad"
  let ans=substirngPalindrome(s)
  console.log(ans)