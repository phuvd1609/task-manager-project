import React, { useState } from "react";

import TaskApi from "../api/TaskApi";

const Form = ({taskList, setTaskList}) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")

    const fetchData = async () => {
        const response = await TaskApi.getAllTask();
        setTaskList(response)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = {
            title: title,
            description: description,
            due_date: dueDate
        }
        const response = await TaskApi.createTask(postData) 
        fetchData();
    }
    return (
        <form>
            <h2>Input task information</h2>
            <label>Title</label>
            <input onChange={e => setTitle(e.target.value)}></input>
            <br></br>
            <label>Description</label>
            <input onChange={e => setDescription(e.target.value)}></input>
            <br></br>
            <label>Due date</label>
            <input type="date" onChange={e => setDueDate(e.target.value)}></input>
            <br></br>
            <button onClick={e => handleSubmit(e)}> Submit </button>
        </form>
    );
}

export default Form;