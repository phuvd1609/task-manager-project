import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';

export default function EditPopup({ task, handleEdit }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description)
    const [dueDate, setDueDate] = useState(task.due_date.split('T')[0])
    const [error, setError] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = async () => {


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
                }
                handleEdit(postData)
                setOpen(false);
            }
        }


        // const postData = {
        //     title: title,
        //     description: description,
        //     due_date: dueDate,
        // }
        // handleEdit(postData)
        // setOpen(false);
    }

    return (
        <span>
            {/* <Button className="edit" variant="outline" onClick={handleClickOpen} title="Edit task">
                <EditIcon></EditIcon>
            </Button> */}
            <button className="edit" onClick={handleClickOpen} title="Edit task">
                <EditIcon></EditIcon>
            </button>
            <Dialog open={open} onClose={handleClose} fullWidth={true}>
                <DialogTitle>Edit task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="title-edit">Title</label>
                                    </td>
                                    <td>
                                        <input id="title-edit" type="text" defaultValue={task.title} onChange={e => setTitle(e.target.value)}></input>
                                    </td>
                                    <td>
                                        {title == '' && error && <p>Please input title</p>}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="description-edit">Description</label>
                                    </td>
                                    <td>
                                        <input id="description-edit" type="text" defaultValue={task.description} onChange={e => setDescription(e.target.value)}></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="deadline-edit">Deadline</label>
                                    </td>
                                    <td>
                                        <input id="deadline-edit" type="date" defaultValue={task.due_date.split('T')[0]} onChange={e => setDueDate(e.target.value)}></input>
                                    </td>
                                    <td>
                                        {dueDate == '' && error && <p>Please input deadline</p>}
                                        {new Date(dueDate) < new Date() && error && <p>Please input correct day</p>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button variant="outline" onClick={handleChange}>Edit</Button>
                </DialogActions>
            </Dialog>
        </span>
    );
}
