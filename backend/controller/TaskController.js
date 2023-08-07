const mongoose = require('mongoose')
const { Task } = require('../db/models/task.model')


const getAllTask = async (req, res) => {
    try {
        const result = await Task.find({}).exec()
        // console.log(result)
        return res.json({
            message: "Get task list successfully",
            status: 200,
            data: result,
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            message: "Get task list failed",
            status: 500,
            data: [],
        })
    }
}

const getTaskByEmail = async (req, res) => {
    const email = req.params.email
    try {
        const result = await Task.find({user_email: email}).exec()
        // console.log(result)
        return res.json({
            message: "Get task list successfully",
            status: 200,
            data: result,
        })
    }
    catch (e) {
        console.log(e)
        res.json({
            message: "Get task list failed",
            status: 500,
            data: [],
        })
    }
}

const createTask = async (req, res) => {
    const title = req.body.title
    const description = req.body.description || "";
    const due_date = Date.parse(req.body.due_date) || Date.now();
    const user_email = req.body.user_email;
    try {
        let temp = await Task.create({
            title: title,
            description: description,
            due_date: due_date,
            user_email: user_email
        })
        return res.json({
            message: "Create task successfully",
            status: 200,
            data: temp,
        })
    }
    catch (e) {
        console.log(e)
        return res.json({
            message: "Create task failed",
            status: 500,
            data: {},
        })
    }
}

const updateTask = async(req, res) => {
    const taskId = req.params.id;
    const updatedvalues = req.body;
    
    try {
        const foundTask = await Task.findById(taskId)
        
        if(!updateTask) {
            return res.json({
                message: "Can not find task to update",
                status: 404,
                data: {},
            })
        }
        
        if(updatedvalues.due_day == undefined) {
            
        }
        else {
            updatedvalues.due_date = Date.parse(updatedvalues.due_day)
            
        }
        Object.assign(foundTask, updatedvalues)
        const updatedTask = await foundTask.save()
        return res.json({
            message: "Update task successfully",
            status: 200,
            data: updatedTask,
        })
    }
    catch(e) {
        console.log(e)
        return res.json({
            message: "Update task failed",
            status: 500,
            data: {},
        })
    }
}

const completeTask = async(req, res) => {
    const taskId = req.params.id;
    try {
        const result = await Task.findOneAndUpdate({_id: taskId}, {completed: true}, {new: true});
        if(!result) {
            return res.json({
                message: "Can not find task to complete",
                status: 404,
                data: {},
            })
        }
        return res.json({
            message: "Complete task successfully",
            status: 200,
            data: result,
        })
    } 
    catch (e) {
        console.log(e)
        return res.json({
            message: "Complete task failed",
            status: 500,
            data: {},
        })
    }
}

const deleteTask = async(req, res) => {
    const taskId = req.params.id;
    try {
        const temp = await Task.findByIdAndDelete(taskId);
        if(!temp) {
            return res.json({
                message: "Can not find task to delete",
                status: 404,
                data: {},
            })
        }
        return res.json({
            message: "Delete task successfully",
            status: 200,
            data: temp,
        })
    } 
    catch (e) {
        console.log(e)
        return res.json({
            message: "Delete task failed",
            status: 500,
            data: {},
        })
    }
}

module.exports = { getAllTask, getTaskByEmail, createTask, updateTask, completeTask, deleteTask }