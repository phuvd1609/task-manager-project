const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const port = 5000;
const { getAllTask, getTaskByEmail, createTask, updateTask, completeTask, deleteTask } = require('./controller/TaskController')
const { signUp, logIn } = require('./controller/UserController')
// IefDl6TVkLdyOIuS
const mongoose = require('mongoose');
const mongoUrl = 'mongodb+srv://phuvd1609:IefDl6TVkLdyOIuS@cluster0.i07iyuv.mongodb.net/?retryWrites=true&w=majority'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connect mongodb successfully')


        app.get('/get-all-task', getAllTask)
        app.get('/get-task/:email', getTaskByEmail)
        app.post('/create-task', createTask)
        app.put('/update-task/:id', updateTask)
        app.put('/complete-task/:id', completeTask)
        app.delete('/delete-task/:id', deleteTask)
        app.post('/signup', signUp)
        app.post('/login', logIn)

        app.listen(port, () => {
            console.log(`local host port ${port}`);
        })
    })
    .catch((err) => {
        console.log('Connect failed: ', err)
    })
