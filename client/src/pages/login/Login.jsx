import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';
import { Link, useNavigate } from 'react-router';
import './login.css'

const Login = () => {
  const [userDetails, setUserDetails] = useState({
    email: null,
    password: null,
  });
  const [ msg , setMsg] = useState(null);
  const navigate = useNavigate();

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const handleChange = (e) => {
    setUserDetails(prev=>({...prev, [e.target.id]:[e.target.value]}))
  };


  const handleLogin = async (e)=>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try{
      console.log(userDetails)
      const res = await axios.post('http://localhost:3200/api/auth/login', userDetails);
      console.log(res.data.details)
      console.log(res.data.message)
      setMsg(res.data.message)
      dispatch({type: 'LOGIN_SUCCESS', payload: res.data.details});
      navigate('/')
    }
    catch(err){
      setMsg(null)
      dispatch({type: "LOGIN_FAILURE", payload: err.response.data})
    }
  }

  // console.log(user);

  return (
    <div className='login' >
      {/* <div>Login</div> */}
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
        <div className='acc' >No account.. please <Link to='/register' >Register</Link></div>
        <div className="fail">{error && <span>{ error.message }</span> }</div>
        <div className="success">{msg && <span>{ msg }</span> }</div>
      </div>
    </div>
  )
}

export default Login