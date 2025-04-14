import React, { useContext, useState } from 'react';
import './login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/navbar/Navbar';

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const [ msg , setMsg] = useState(null);
  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  //input onChange handler:
  const handleChange = (e) => {
    setUserDetails(prev=>({...prev, [e.target.id]:[e.target.value]}))
  };

  //Login handler:
  const handleLogin = async (e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      console.log(userDetails)
      const res = await axios.post('http://localhost:3200/api/auth/login', userDetails);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      console.log(res.data.details)
      setMsg(res.data.message)
      if(res.data.isAdmin){
        // dispatch({type:"LOGIN_SUCCESS", payload:{Details:res.data.details,isAdmin:res.data.isAdmin}})
        dispatch({type:"LOGIN_SUCCESS", payload:res.data.details})
        navigate('/')
      }else{
        dispatch({type: "LOGIN_FAILURE", payload: {message:'You are not allowed!'}})
      }
    }
    catch(err){
      setMsg(null)
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  // console.log(user);

  return (
    <div className='login' >
      <div className="lContainer">
        <input 
          type="email" 
          className="lInput" 
          id='email'
          placeholder='email'
          onChange={handleChange}  
        />
        <input 
          type="password" 
          className="lInput" 
          id='password'
          placeholder='password'
          onChange={handleChange}
        />
        <button disabled={loading} onClick={handleLogin} className="lButton">Login</button>
        <div className="fail">{error && <span>{ error.message }</span> }</div>
        <div className="success">{msg && <span>{ msg }</span> }</div>
      </div>
    </div>
  )
}

export default Login