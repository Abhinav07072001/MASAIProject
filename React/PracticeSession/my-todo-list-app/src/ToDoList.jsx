import { useState } from "react";

export default function ToDoList(){
    const [tasks, setTasks]=useState([]);
    const [input, setInput]=useState("");

    function handleAddTask(){
        if(input.trim()==="")return;

        const newTask={
            id:Date.now(),
            text:input,
            completed:false,
        };
        setTasks([...tasks, newTask])
        setInput("");
    }
    function handleDeleteTask(id){
        return setTasks(tasks.filter((task)=> task.id !== id));
    }

    function handleToggleButton(id){
        setTasks(
            tasks.map((task)=>
                task.id===id ?{...task, completed:!task.completed}: task 
            )
        );
    }

    return(
        <div style={{textAlign:"center", marginTop:"20px"}}>
            <h2>To Do List App</h2>
            <input type="text" 
            placeholder="Enter Task ..." 
            value={input}
            onChange={(e)=>setInput(e.target.value)}/>

            <button onClick={handleAddTask}>Add Task</button>

            <ul style={{margin:"8px", padding:"10px"}}>
                {tasks.map((task)=>(
                    <li key={task.id}
                    style={{
                        textDecoration:task.completed? "line-through": "none",
                        marginBottom:"10px"
                    }}>
                        {task.text}  
                    <button onClick={()=>handleToggleButton(task.id)}y
                        style={{marginLeft:"10px"}}>✔ </button > 
                    <button onClick={() => handleDeleteTask(task.id)}
                        style={{marginLeft:"10px"}}>❌</button>
                    
                    </li>
                ))}
                
            </ul>
        </div>
    );
}