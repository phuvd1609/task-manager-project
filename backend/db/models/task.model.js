const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: false,
    },
    due_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    user_email: {
        type: String
    }
}, {collection: 'Task'})

const Task = mongoose.model('Task', TaskSchema)

module.exports = { Task }