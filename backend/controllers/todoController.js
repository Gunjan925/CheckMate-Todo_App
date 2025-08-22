const {createTodo,getTodosByUser,updateTodo,toggleTodoComplete,deleteTodo} = require('../models/todoModel');

const createTodoController = async(req,res) => {
    try{
        const userId = req.user.id; // from the jwt token in the authcontroller
        const {title,desc,deadline} = req.body;
        if(!title || !desc || !deadline)
        {
            return res.status(400).json({message : "All fields are required"});
        }
        const todoId = await createTodo(userId,title,desc,deadline);
        // send full object back to frontend
        const newTodo = {
        todo_id: todoId,
        todo_title: title,
        todo_desc: desc,
        todo_deadline: deadline,
        is_completed: false
        };
        res.status(201).json(newTodo);
    }catch(err){
        res.status(500).json({message : err.message});
        console.log(err);
    }
};

const getTodoController = async(req,res) => {
    try{
        const userId = req.user.id; // from the jwt token in the authcontroller
        const todos = await getTodosByUser(userId);
        res.json(todos);
    }catch(err){
        res.status(500),json({message : err.message});
    }
};

const updateTodoController = async(req,res) => {
    try{
        const userId = req.user.id; // from the jwt token in the authcontroller
        const todoId = req.params.id; // from the url
        const {title,desc,deadline} = req.body;

        await updateTodo(userId,todoId,title,desc,deadline);
        res.status(201).json({message : "Todo Updated!"});
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

const toggleCompleteTodoController = async(req,res) => {
    try{
        const userId = req.user.id; // from the jwt token in the authcontroller
        const todoId = req.params.id; // from the url
        await toggleTodoComplete(userId,todoId);
        res.json({message : "Todo status updated"});
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

const deleteController = async(req,res) => {
    try{
        const userId = req.user.id; // from the jwt token in the authcontroller
        const todoId = req.params.id; // from the url
        await deleteTodo(userId,todoId);
        res.json({message : "Todo deleted"});
    }catch(err){
        res.status(500).json({message : err.message});
    }
};

module.exports = {createTodoController,getTodoController,updateTodoController,toggleCompleteTodoController,deleteController};