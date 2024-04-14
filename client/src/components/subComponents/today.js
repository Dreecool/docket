import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Typography, TextField, Modal } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { setTask, setDescription, setDate } from '../../actions/addTask';
import { addTask } from '../../actions/addTask';
import { getTask } from '../../actions/addTask';
import { getOverDueTask } from '../../actions/addTask';
import { editTask } from '../../actions/editTask';
import Cookies from 'js-cookie';
import './SubComp.css';
import { format } from 'date-fns'; 
import OverDueDatePage from './overDueDate';
import { deleteTask } from '../../actions/editTask';

import { setEditTask, setEditDescription, setEditDate } from '../../actions/editTask';

const TodayPage = () => {

    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [disabledInput, setIsDisabledInput] = useState(false);
    const [id, setId] = useState('');
    const taskRef = useRef(null);

    const taskName = useSelector((state) => state.addTask.task);
    const taskDescription = useSelector((state) => state.addTask.description);
    const taskDate = useSelector((state) => state.addTask.date)
    const userID = useSelector((state) => state.User.responseData?.ID);
    const getTasks = useSelector((state) => state.addTask.responseData)
    const overDueDateTask = useSelector((state) => state.addTask.responseDelayData);

    const updateTask = useSelector((state) => state.editTask.task);
    const updateDescription = useSelector((state) => state.editTask.description);
    const updateDate = useSelector((state) => state.editTask.date);


    const AddTaskbtn = () => {
        const formattedDate = format(new Date(taskDate), 'yyyy-MM-dd');
        dispatch(addTask({
            userID: userID,
            task: taskName,
            description: taskDescription,
            date: taskDate
        }))
        
    }

    const CloseInput = () => {
        dispatch(setTask(''));
        dispatch(setDescription(''));
        setShowInput(false)
    }
    
    const userId = Cookies.get("userId");

    useEffect(() => {
        dispatch(getTask(userId))
        dispatch(getOverDueTask(userId))
    }, [getTasks])


    const getCurrentDate = () => {
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const currentDate = new Date();
        const dayOfWeek = daysOfWeek[currentDate.getDay()];
        const month = months[currentDate.getMonth()];
        const dayOfMonth = currentDate.getDate();
        return `${dayOfWeek} ${month} ${dayOfMonth}`;
    }

    const EditBtn = (id) => {
        setId(id);
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
                <div className="upcomming-page-container  container-fluid mb-5">
                    <div className="d-flex align-items-center">
                        <Typography variant="h4">Today</Typography>
                        <span className="ms-4 border fw-bold fs-2 ps-3 pe-3">{getTasks && getTasks.length}</span>
                    </div>
                    <div className="addTask-parent-container border mt-4">
                        <div className="p-4">
                            <Typography variant="h6">Today {getCurrentDate()}</Typography>
                            <div className="mt-3">
                                <div className="addTask-btn-container d-flex align-items-center border pt-2 pb-2" onClick={() => setShowInput(true)}>
                                    <span className="ms-3 fs-5">+</span>
                                    <Button className="addTask-btn ms-2 fs-6" style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
                                        Add Task
                                    </Button>
                                </div>
                                {showInput &&
                                    <div className='inputTask-container mt-3 border ps-2 pe-2 pt-2 pb-2 '>
                                        <div className='mb-2'>
                                            <TextField value={taskName} onChange={((e) => dispatch(setTask(e.target.value)))} 
                                             className='input-task col-lg-12 mb-2 pt-2 pb-1' label='Task Name' variant='outlined' />
                                            <TextField value={taskDescription} onChange={((e) => dispatch(setDescription(e.target.value)))} 
                                            className='input-description col-lg-12 pt-2 pb-1' label='Description' variant='outlined' />
                                        </div>
                                        <div className='d-flex align-items-center pt-2 pb-2'>
                                            <div className='me-3 d-flex align-items-center'>
                                                <h7 style={{ color: 'rgba(0, 0, 0, 0.7)' }} className='addDate-tx'>Add Date : </h7>
                                            </div>
                                            <DatePicker
                                                selected={new Date(taskDate)}
                                                onChange={(date) => dispatch(setDate(date.getTime()))}
                                                dateFormat="yyyy-MM-dd"
                                                className="form-control datepicker-text"
                                            />
                                        </div>
                                        <div className='action-bar d-flex align-items-center justify-content-end align-items-center mt-3 mb-2  '>
                                            <button onClick={CloseInput}  className='cancel-btn mt-3 me-4 fs-5 ps-2 pe-2'><i class="fa-solid fa-xmark"></i></button>
                                            <button disabled={taskName.length > 0 && taskDescription.length !== 0 ? isDisabled : !isDisabled} className='add-task-btn mt-3 me-3 ps-2 pe-2 fs-5' onClick={AddTaskbtn}><i class="fa-solid fa-plus"></i></button>
                                        </div>
                                    </div>
                                }
                                <div>
                                    {getTasks && getTasks.map((val) => {
                                    return(
                                        <div id={val._id} key={val._id} className='task-div border mt-3 d-flex justify-content-between'>
                                            <div className='d-flex flex-column pb-2'>
                                                <div className='d-flex align-items-center ms-3 mt-3'>
                                                    <input type='checkbox' onChange={() => doneTaskBtn(val._id)} className='checkbox'/>   
                                                    <input className='ms-3 my-task' defaultValue={val.task} onChange={((e) => dispatch(setEditTask(e.target.value)))} disabled={id === val._id ? disabledInput : !disabledInput} ref={id === val._id ? taskRef : null}
                                                    />
                                                </div>
                                                <input className='sub-txt mt-2 mb-2' defaultValue={val.description} onChange={((e) => dispatch(setEditDescription(e.target.value)))} disabled={id === val._id ? disabledInput : !disabledInput}/>
                                                {id === val._id ? <input type='date' defaultValue={val.date} onChange={((e) => dispatch(setEditDate(e.target.value)))} className='date-input col-lg-3'/> : null}
                                            </div>
                                            <div className='d-flex action-task-btn'>
                                            <button onClick={() => EditBtn(val._id)}><i class="fa-solid fa-pen-to-square"></i></button>
                                            <button onClick={() => {
                                                dispatch(deleteTask(val._id));
                                            }}><i class="fa-solid fa-trash"></i></button>
                                            {id === val._id ?  <button onClick={() => {
                                               
                                                 setId('')
                                                 dispatch(editTask({
                                                     id: val._id,
                                                     task: updateTask || val.task,
                                                     description: updateDescription || val.description,
                                                     date: updateDate || val.date
                                                 }))
                                            }}><i class="fa-solid fa-arrow-down"></i></button> : null}
                                            </div>
                                        </div>
                                    ) 
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default TodayPage