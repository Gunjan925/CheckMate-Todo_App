const db = require('../config/db');

const createTodo =  async(userId,title,desc,deadline) => {
    // inserting todo in todos table
    const [result] = await db.execute(
        "INSERT INTO todos (todo_title, todo_desc, todo_deadline, is_completed) VALUES (?,?,?,?)",
        [title,desc,deadline,false]
    );

    // getting the todoid for newly inserted todo
    const todoId = result.insertId;

    // mapping the todo with the user
    await db.execute(
        "INSERT INTO users_todos (user_id, todo_id) VALUES (?,?)",
        [userId,todoId]
    );

    return todoId;
};

const getTodosByUser = async (userId) => {
    const [rows] = await db.execute(
        `SELECT todos.* 
        FROM todos
        JOIN users_todos ON todos.todo_id = users_todos.todo_id
        WHERE users_todos.user_id = ?
        ORDER BY todos.created_at DESC`,
        [userId]
    );
    return rows;
};

const updateTodo = async(userId,todoId,title,desc,deadline) => {
    await db.execute(
        `UPDATE todos
        SET todo_title = ?, todo_desc = ?, todo_deadline = ?
        WHERE todo_id = ? AND todo_id IN (SELECT todo_id FROM users_todos WHERE user_id = ?)`,
        [title,desc,deadline,todoId,userId]
    );
    return todoId;
};

const toggleTodoComplete = async(userId,todoId) => {
    await db.execute(
        `UPDATE todos
        SET is_completed = NOT is_completed
        WHERE todo_id = ? AND todo_id IN (SELECT todo_id FROM users_todos WHERE user_id = ?)`,
        [todoId,userId]
    );
    return todoId;
};

const deleteTodo = async(userId,todoId) => {
    await db.execute(
        `DELETE FROM todos
        WHERE todo_id = ? AND todo_id IN (SELECT todo_id FROM users_todos WHERE user_id = ?)`,
        [todoId,userId]
    );
    return todoId;
};

module.exports = {createTodo,getTodosByUser,updateTodo,toggleTodoComplete,deleteTodo};