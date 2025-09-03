import React, { useState } from "react";
import {useSelector, useDispatch} from "react-redux"
import { addTask, removeTask, toggleTask } from "../features/takeSlice.js";

function TaskList(){
    const [text, setText]=useState("");
    const tasks= useSelector((state)=>state.tasks);
    const dispatch=useDispatch();

    const handleAdd= ()=>{
        if(text.trim()){
            dispatch(addTask(text));
            setText("");
        }
    };

    return(
        <div style={{maxWidth:"4oopx" ,margin:"20px auto "}}>
            <h2>Task List</h2>
            <input type="text" 
            placeholder="Enter Task..."
            value={text}
            onChange={(e)=>setText(e.target.value)}/>

            <button onClick={handleAdd} style={{margin: "10px"}}>Add </button>

            <ul>
                {tasks.map((task)=>(
                    <li key={task.id} style={{margin:"8px 0"}}>
                        <span onClick={()=>dispatch(toggleTask(task.id))}
                            style={{
                                textDecoration: task.completed ? "line-through" : "none",
                                cursor: "pointer",
                            }}>
                                {task.text}
                        </span>

                        <button  onClick={()=>dispatch(removeTask(task.id))} 
                            style={{marginLeft:"10px"}}>
                                 ❌
                            </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default TaskList