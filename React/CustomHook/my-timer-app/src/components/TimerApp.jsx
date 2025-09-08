import React from "react";
import useTimer from "../hooks/useTimer.js";

function TimerApp(){
    const{timer, isRunning, startTimer, stopTimer, resetTimer}=useTimer();

    return(
        <div>
            <h1>Timer: {timer}</h1>
            <p>{isRunning ? "Running" : "Stooped"}</p>
            <button onClick={startTimer}>Start</button> <br /> 
            <br />
            <button onClick={stopTimer}>Stop</button> <br />
            <br />
            <button onClick={resetTimer}>reset</button>
        </div>
    );
}
export default TimerApp;