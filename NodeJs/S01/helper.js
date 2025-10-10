// CJS Module System
// function fun(){
//     for(let i=1; i<=10; i++){
//         console.log(i);
//     }
// }

// function sum(a,b){
//     return `Sum of two Numbers is ${a + b}`
// }
// module.exports= {fun , sum}

// ESM Module System
 export function fun(){
    for(let i=1; i<10; i++){
        console.log(i);
    }
}
export function diff(a,b){
    return `Differnce od two Number is ${a - b}`
}

