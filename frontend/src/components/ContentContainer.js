import React, { useEffect, useState } from "react";

import TaskApi from "../api/TaskApi";
import Task from "./Task";
import { useCookies } from "react-cookie";

const ContentContainer = ({ authToken }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [taskList, setTaskList] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        if (authToken) {
            fetchTask();
        }
    }, [])

    const fetchTask = async () => {
        try {
            const updatedTasks = await TaskApi.getTaskByEmail(cookies.Email);
            setTaskList(updatedTasks.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title == '' || dueDate == '') {
            setError(true)
        }
        else {
            setError(false)
            if (new Date(dueDate) < new Date()) {
                setError(true);
            }
            else {
                const postData = {
                    title: title,
                    description: description,
                    due_date: dueDate,
                    user_email: cookies.Email,
                }
                const resposne = await TaskApi.createTask(postData)
                console.log(resposne)
                fetchTask();
            }
        }
    }

    const signOut = () => {
        console.log('sign out')
        removeCookie('Email')
        removeCookie('AuthToken')
        window.location.reload()
    }

    return (
        <div>
            {/* <Form taskList={taskList} setTaskList={setTaskList}></Form>
            <TaskList taskList={taskList} setTaskList={setTaskList}></TaskList> */}
            <div className="button-container">

                <button className="signout" onClick={() => signOut()}>Sign out</button>
            </div>
            <form className="add-form">
                <h2>Add new task</h2>
                <table>
                    <tbody>
                        <tr>
                            <td width={"100px"}>
                                <label htmlFor="add-title">Title</label>
                            </td>
                            <td>
                                <input style={{ maxWidth: true }} id="add-title" onChange={e => setTitle(e.target.value)}></input>
                            </td>
                            <td>
                                {title == '' && error && <p>Please input title</p>}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="add-description">Description</label>
                            </td>
                            <td>
                                <input id="add-description" onChange={e => setDescription(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="add-date">Due date</label>
                            </td>
                            <td>
                                <input id="add-date" type="date" onChange={e => setDueDate(e.target.value)}></input>
                            </td>
                            <td>
                                {dueDate == '' && error && <p>Please input deadline</p>}
                                {new Date(dueDate) < new Date() && error && <p>Please input correct day</p>}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><div className="button-container">

                                <button className="create" onClick={e => handleSubmit(e)}> Add task </button>
                            </div></td>
                        </tr>
                    </tbody>
                </table>

            </form>

            <div>
                {taskList.length > 0 && taskList?.map((task) => <Task key={task._id} task={task} fetchTask={fetchTask}></Task>)}
            </div>
        </div>
    );
}

export default ContentContainer;