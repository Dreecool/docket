import './SubComp.css';
import {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addStickWall } from '../../actions/stickyWall';
import Cookies from 'js-cookie';

import { getStickWall, deleteStickWall } from '../../actions/stickyWall';

//actions
import { setTitle, setDescription, setBackgroundColor } from '../../actions/stickyWall';

const InboxPage = () => {

    const dispatch = useDispatch();

    const [showBox, setShowBox] = useState(false)

    

    //input
    const title = useSelector((state) => state.stickyWall.title);
    const description = useSelector((state) => state.stickyWall.description);
    const bgColor = useSelector((state) => state.stickyWall.backgroundColor);

    const setBgColor = (color) => {
        dispatch(setBackgroundColor(color));
    } 
    const userID = Cookies.get("userId");
    const data = useSelector((state) => state.stickyWall.responseData)

    useEffect(() => {
        dispatch(getStickWall(userID))
    }, [data])

    
    return (
        <>
            <div 
             className='sticky-wall-container'>

                    <h1>Sticky Wall</h1>

                <div className="sticky-wall-parent-div d-flex align-items-center m-2 me-2   mt-4">

                    {showBox ? 

                        <div  className="text-container-div d-flex flex-column ms-4 mt-2 mb-2 border">

                            <div className="mt-2 d-flex justify-content-center col-lg-12">

                                <input 
                                    value={title}  
                                    onChange={((e) => dispatch(setTitle(e.target.value)))} 
                                    className="stick-input col-lg-10 align-self-center"  
                                    placeholder="TITLE" 
                                    autoFocus
                                    />

                                </div>

                                <div className="mt-2 d-flex justify-content-center">
                                    <textarea value={description} onChange={((e) => dispatch(setDescription(e.target.value)))} className="txt-area-input col-lg-10" placeholder="Description"/>
                                </div>

                                <div className="action-bars d-flex justify-content-around mt-4 pb-2 pt-2">

                                <div className="d-flex justify-content-around w-50">
                                    <button  onClick={() => setBgColor("red")} className="redBtn"></button>
                                    <button  onClick={() => setBgColor("yellow")} className="yellowBtn"></button>
                                    <button  onClick={() => setBgColor("pink")} className="pinkBtn"></button>
                                </div>

                                <div className="d-flex justify-content-end ">
                                    <button 
                                    className="stick-cancel me-2 ps-2 pe-2" 
                                    onClick={() => {
                                        setShowBox(false)
                                        dispatch(setDescription(''))
                                        dispatch(setTitle(''))
                                        dispatch(setBackgroundColor(''))
                                    }}>
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                    <button 
                                    className="stick-add me-2 ps-2 pe-2" 
                                    onClick={() => {
                                        dispatch(
                                            addStickWall({
                                            userID: userID,
                                            title: title,
                                            description: description,
                                            backgroundColor: bgColor
                                        }))
                                        setShowBox(false)
                                    }}>
                                        <i class="fa-solid fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                     : 
                     null
                    }
                        
                    {showBox ? 
                      null 
                     : 
                     <div className="btn-parent-div  d-flex align-items-center ms-4 mt-2 mb-2">
                      <button className="col-lg-11 fs-2" onClick={() => setShowBox(true)}><i class="fa-solid fa-plus"></i></button>
                     </div>
                    }
                  
                    {data && data.map((val) => {
                        return (
                            <div
                                key={val._id}
                                id={val._id}
                                style={{ backgroundColor: `${val.backgroundColor}` }}
                                className='data-container border ms-4 mt-2 mb-2 position-relative'>
                                <h5 style={{ fontWeight: '600', marginLeft: '25px', marginTop: '18px' }}>{val.title}</h5>
                                <p style={{ marginLeft: '25px', marginTop: '18px', marginRight: '18px' }}>{val.description}</p>
                                <div className="delete-button">
                                    <button
                                     onClick={() => {
                                        dispatch(deleteStickWall(val._id))
                                     }}>
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}

export default InboxPage