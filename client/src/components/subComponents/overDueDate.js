import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography, TextField, Modal } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import './SubComp.css';
import { format } from 'date-fns';
import { deleteTask, editTask, setEditTask, setEditDescription, setEditDate } from '../../actions/editTask';
import { getOverDueTask } from '../../actions/addTask';
import Cookies from 'js-cookie';

const OverDueDatePage = (props) => {

    const dispatch = useDispatch();

    const [showInput, setShowInput] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [disabledInput, setIsDisabledInput] = useState(false);
    const [id, setId] = useState('');
    const taskRef = useRef(null);

    const overDueTask = useSelector((state) => state.addTask.responseDelayData);

    const updateTask = useSelector((state) => state.editTask.task);
    const updateDescription = useSelector((state) => state.editTask.description);
    const updateDate = useSelector((state) => state.editTask.date);

    const userId = Cookies.get("userId");

    useEffect(() => {
        dispatch(getOverDueTask(userId));
    }, [overDueTask])

    const EditBtn = (id) => {
        setId(id);
    }

    const SaveBtn = (id) => {
        setId('');
    }

    useEffect(() => {
        if (id) {
            taskRef.current.focus();
        }
    }, [id]);

    const doneTaskBtn = (id) => {
        dispatch(deleteTask(id))
    }
    

    return (
        <>
            <Container>
                <div className="upcomming-page-container container-fluid">
                    <div className="d-flex align-items-center">
                        <Typography variant="h4" className='text-danger'>Overdue</Typography>
                        <span className="ms-4 border fw-bold fs-2 ps-3 pe-3 text-danger">{overDueTask && overDueTask.length}</span>
                    </div>
                    <div className="addTask-parent-container border mt-4">
                        <div className="p-4">
                            <div className="mt-3">
                                <div>
                                    {overDueTask && overDueTask.length === 0 ? <p>No Delayed Task</p> :
                                       overDueTask && overDueTask.map((val) => (
                                            <div id={val._id} key={val._id} className='task-div border mt-3 d-flex justify-content-between'>
                                                <div className='pb-2'>
                                                    <div className='d-flex align-items-center ms-3 mt-3'>
                                                        <input type='checkbox' onChange={() => doneTaskBtn(val._id)} className='checkbox' />
                                                        <input className='ms-3 my-task' defaultValue={val.task} onChange={(e) => dispatch(setEditTask(e.target.value))} disabled={id === val._id ? disabledInput : !disabledInput} ref={id === val._id ? taskRef : null} />
                                                    </div>
                                                    <input className='sub-txt mt-2 mb-2' defaultValue={val.description} onChange={(e) => dispatch(setEditDescription(e.target.value))} disabled={id === val._id ? disabledInput : !disabledInput} />
                                                    {id === val._id ? <input type='date' defaultValue={val.date} onChange={(e) => dispatch(setEditDate(e.target.value))} className='date-input col-lg-3' /> : null}
                                                </div>
                                                <div className='d-flex action-task-btn'>
                                                    <button onClick={() => EditBtn(val._id)}><i className="fa-solid fa-pen-to-square"></i></button>
                                                    <button onClick={() => dispatch(deleteTask(val._id))}><i className="fa-solid fa-trash"></i></button>
                                                    {id === val._id ?
                                                        <button onClick={() => {
                                                            setId('');
                                                            dispatch(editTask({
                                                                id: val._id,
                                                                task: updateTask || val.task,
                                                                description: updateDescription || val.description,
                                                                date: updateDate || val.date
                                                            }))
                                                        }}><i className="fa-solid fa-arrow-down"></i></button>
                                                        : null}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OverDueDatePage;
