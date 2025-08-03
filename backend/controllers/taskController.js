const Task = require('../models/Task'); 
const getTasks = async (req, res) => { 
    try { 
        const tasks = await Task.find({ userId: req.user.id }); 
        res.json(tasks);
    } catch (error){ 
        res.status(500).json({ message: error.message });
    }
};

const addTask = async (req, res) => { 
    const { title, description, deadline } = req.body; 
    try { 
        const task = await Task.create({ userId: req.user.id, title, description, deadline }); 
        res.status(201).json(task); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
};

const updateTask = async (req, res) => { 
    const { title, description, completed, deadline } = req.body; 
    try { 
        const task = await Task.findById(req.params.id); 
        if (!task) return res.status(404).json({ message: 'Task not found' }); 
        
        task.title = title || task.title; 
        task.description = description || task.description; 
        task.completed = completed ?? task.completed; 
        task.deadline = deadline || task.deadline; 
        
        const updatedTask = await task.save(); 
        res.json(updatedTask); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
};

const deleteTask = async (req, res) => {
    try { const task = await Task.findById(req.params.id); 
        if (!task) return res.status(404).json({ message: 'Task not found' }); 
        
        await task.remove(); 
        res.json({ message: 'Task deleted' }); 
    } catch (error) { 
        res.status(500).json({ message: error.message }); 
    } 
}; 
// This is an example of a task controller that handles CRUD operations for tasks in a task management application. It includes functions to get all tasks, add a new task, update an existing task, and delete a task. Each function interacts with the Task model and handles errors appropriately, returning JSON responses to the client. 
// The `req.user.id` is used to associate tasks with the authenticated user, ensuring that users can only access their own tasks.
module.exports = { getTasks, addTask, updateTask, deleteTask };