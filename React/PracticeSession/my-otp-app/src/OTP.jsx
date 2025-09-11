import { useRef, useState } from "react";

export default function OTP({length}){
    const [otp, setOtp]= useState(new Array(length).fill(""));

    const inpputRef=useRef([]);  // sab inputs ka refernce ka liya

    function handleChange(e, index){
        const value= e.target.value;

        if(/^[0-9]$/.test(value)){
            const newotp= [...otp];
            newotp[index]=value;
            setOtp(newotp);
            
            if(index<length - 1){
                inpputRef.current[index + 1].focus();
            }
        }else if(value===""){
            const newotp=[...otp];
            newotp[index]="";
            setOtp(newotp);
        }

    }

    function keyDown(e, index){
        if(e.key==="Backspace" && otp[index]==="" && index>0){
            inpputRef.current[index - 1].focus();
        }
    }

     function handlePaste(e, index){
        e.preventDefault();  // default paste na ho 
        const paste= e.clipboardData.getData("text").trim();  // pura text
        if(!/^[0-9]+$/.test(paste)) return;  // agar number na ho, ignore

        const pasteArray=paste.split(""); // "1234" -> ["1","2","3","4"]
        const newOtp=[...otp];
        
        // Fill values index se start hoke
        for(let i=0; i<pasteArray.length &&  index + i<otp.length; i++){
            newOtp[index + i]=pasteArray[i];
        }
        setOtp(newOtp);

         // Focus shift to last filled box
        const nextIndex=Math.min(index+pasteArray.length, otp.length - 1);
        inpputRef.current[nextIndex].focus();
     }

    return(
        <div>
            <h2>Enter OTP:</h2>
            {otp.map((digit,index)=>(
                <input type="text" 
                key={index}
                value={digit}
                maxLength={1}
                ref={(el)=> (inpputRef.current[index]=el)}
                onChange={(e)=>handleChange(e, index)}
                onKeyDown={(e)=>keyDown(e, index)}
                onPaste={(e)=>handlePaste(e, index)}
                style={{
                    width:"40px",
                    height:"40px",
                    borderRadius:"10px",
                    margin:"5px",
                    fontSize:"20px",
                    textAlign:"center"
                }}
                />
            ))}
        </div>
    );
}