import { Link, useNavigate, useLocation } from 'react-router-dom';
import {setEmail, setPassword, setLoading, setModalIsOpen} from '../actions/login';
import { setLog } from '../actions/login';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Modal from 'react-modal';
import Spinner from 'react-bootstrap/Spinner';

//image
import image from '../image/login_image.png'

  const LoginComponents = () => {

    const dispatch = useDispatch();
    const Navigate = useNavigate();
   
    const email = useSelector((state) => state.Login.email);
    const password = useSelector((state) => state.Login.password);

    const isLoading = useSelector((state) => state.Login.loading);
    const modalIsOpen = useSelector((state) => state.Login.modalIsOpen)

    const submit = (e) => {
      e.preventDefault()
      dispatch(setLoading(true));
      dispatch(setModalIsOpen(true));

      try {
        dispatch(setLog({
          email: email,
          password: password
        }))

      } catch(error) {

      } finally {
        setTimeout(() => {
          dispatch(setLoading(false));
          dispatch(setModalIsOpen(false));
        }, 2000);
      }
    
    }

    
    const token = Cookies.get('authToken');

    useEffect(() => {
      const checkToken = async () => {
        try {
          const token = Cookies.get('authToken');
          if (token) {
            Navigate('/welcome')
            return null
          }
        } catch (error) {
          console.error('Error checking token:', error);
        }
      };
    
      checkToken();
    }, [Navigate]);


      return (

        <>

        {!Cookies.get('authToken') ? (

            <div className='login-parent-container d-flex'>
              <div className='container-md border border-black login-image-container d-flex align-items-center justify-content-center'>
                <div></div>
                  <div className='img-parent-container'>
                    <img  src={image}/>
                  </div>
              </div>
            <div className="container-md containers d-flex align-items-center justify-content-center"> 
          
            <div className=''>  
              <h1 className='fw-bold'>Sign In</h1>
              <div className="d-flex justify-content-center mt-5">
                    <form className="form-container row d-flex justify-content-center col-lg-12 pb-5 pt-5">
                      <div className="d-flex flex-column col-lg-12 mb-4">
                        <input placeholder='Email Address' value={email} onChange={((e) => dispatch(setEmail(e.target.value)))} type="text" className="pt-2 pb-2  col-lg-12" id="emailLogin" autoFocus/>
                      </div>
                      <div className="d-flex flex-column col-lg-12 mb-4">
                        <input placeholder='Password' value={password} onChange={((e) => dispatch(setPassword(e.target.value)))} type="password"  className="pt-2 pb-2" id="passLogin"/>
                      </div>
                      <div className="col-lg-12 ">
                        <button onClick={submit} className="bg bg-dark pt-2 pb-2 col-lg-12">Sign in</button>
                      </div>
                  </form>
              </div>
              <div className="d-flex justify-content-center">
                <div>
                <p className='text-center'>Dont have an account? <span><Link className="signup-link bg bg-white" to='/register'>Signup now</Link></span></p>
                <p>©2024 Docket. Created by Frances</p>
                </div>
              </div>
            </div>
            </div>
  
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => dispatch(setModalIsOpen(false))}
            contentLabel="Loading Modal"
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',  
                transform: 'translate(-50%, -50%)',
                padding: 0,
                border: 'none', 
                borderRadius: '8px'
              }
            }}
            shouldCloseOnOverlayClick={false} 
            shouldCloseOnEsc={false} 
          >
           <div className="text-center p-5" style={{  overlay: {  backgroundColor: 'rgba(0, 0, 0, 0.5)' }, border: 'none' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
           </Spinner>
  
          </div>
        
    
          </Modal>

            </div>

        ) : null}

          
  
        </>
  
      )

    
    
  }

  export default LoginComponents
