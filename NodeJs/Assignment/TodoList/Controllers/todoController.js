const {readFile, writeFile}=require('../models/todoModel.js');

const getTodos= (req,res)=>{
    const db=readFile();
    res.json(db.todos);
}

const addTodos= (req,res)=>{
    const db=readFile();
    const newTodo= {id:Date.now(), ...req.body };
    db.todos.push(newTodo);
    writeFile(db);
    res.status(200).json(newTodo);
};

const searchTodos=(req,res)=>{
    const db= readFile();
    const q=req.query.q?.toLowerCase();
    if(!q) return res.json({message:"Query required"});

    const results=db.todos.filter(t=> t.title.toLowerCase().includes(q));
    res.json(results.length ? results : {message: "No match found"});
};
const updateTodo= (req,res)=>{
    const db=readFile();
    const id=Number(req.params.id);
    const index= db.todos.findIndex(t=> t.id===id);

    if(index!== -1){
        db.todos[index]={...db.todos[index], ...req.body};
        writeFile(db);
        res.json(db.todos[index]);
    }else{
        res.status(404).json({message: "To do not found"});
    }
};
const deletetodo =(req,res)=>{
    const db=readFile();
    const id=Number(req.params.id);
    const index= db.todos.findIndex(t=> t.id===id);

    if(index!== -1){
        const deleted =db.todos.splice(index, 1);
        writeFile(db);
        res.json(deleted);
    }else{
        res.status(404).json({message: "Todo not found"});
    }
};
module.exports={getTodos, addTodos, searchTodos, updateTodo, deletetodo};