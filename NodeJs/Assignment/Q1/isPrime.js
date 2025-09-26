function isPrime(a){
    if(a%2!==0){
        return `${a}is not a prime number`
    }
    else{
        return `${a} is  a prime number`
    }
}
module.exports={isPrime}