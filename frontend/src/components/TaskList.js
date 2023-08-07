import React, { useEffect, useState } from "react";
import Task from "./Task";
import TaskApi from "../api/TaskApi";
// const taskList = ["task 1", "task 2", "task 3"]
const TaskList = ({taskList, setTaskList}) => {
    
    useEffect(() => {
        const fetchData = async () => {
            const response = await TaskApi.getAllTask()
            setTaskList(response.data)
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     console.log(taskList)
    // }, [taskList])

    return (
        <div>
            {taskList.length > 0 && taskList?.map((task) => <Task key={task._id} task={task}></Task>)}
            {/* {taskList.length > 0 && taskList?.map((task) => <h2>{task.title}</h2>)} */}

        </div>
    );
}

export default TaskList;