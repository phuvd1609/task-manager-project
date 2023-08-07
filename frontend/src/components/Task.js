import React, { useEffect } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Button } from "@mui/material";
import TaskApi from "../api/TaskApi";
import EditPopup from "./EditPopup";
const Task = ({ task, fetchTask }) => {
    useEffect(() => {

    }, [task])


    const handleComplete = async () => {
        const response = await TaskApi.completeTask(task._id)
        console.log(response)
        fetchTask();
    }

    const handleDelete = async () => {
        const response = await TaskApi.deleteTask(task._id)
        console.log(response)
        fetchTask();
    }

    const handleEdit = async (postData) => {
        const response = await TaskApi.editTask(task._id, postData)
        console.log(response)
        fetchTask();
        // console.log('edit task')
    }

    return (
        // <div className="list-item">
        //     <Grid container >
        //         <Grid item xs={8} className="task-container-info">
        //             <h2>Title: {task?.title}</h2>
        //             <p>Description: {task?.description}</p>
        //             <p>Deadline: {task.due_date.split('T')[0]}</p>
        //             <p>Status: {task.completed ? "Done" : "Not done"}</p>
        //         </Grid>
        //         <Grid item className="task-container-button">
        //             <Button onClick={handleComplete}><CheckIcon></CheckIcon></Button>
        //             <EditPopup task={task} handleEdit={handleEdit}></EditPopup>
        //             <Button onClick={handleDelete}><ClearIcon></ClearIcon></Button>
        //         </Grid>
        //     </Grid>
        // </div>
        <div className="list-item">
            
                <div className="info-container">
                    <h3>Title: {task?.title}</h3>
                    
                    <p>Description: {task?.description}</p>
                    <p>Deadline: {task.due_date.split('T')[0]}</p>
                    <p>Status: {task.completed ? "Done" : "Not done"}</p>
                </div>
                <div className="button-container">
                    <button className="complete" onClick={handleComplete} title="Complete task"><CheckIcon></CheckIcon></button>
                    <EditPopup task={task} handleEdit={handleEdit}></EditPopup>
                    <button className="delete" onClick={handleDelete} title="Delete task"><ClearIcon></ClearIcon></button>
                </div>
            
        </div>
    );
}

export default Task;