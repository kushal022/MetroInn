import React, { useContext, useState } from 'react';
import './navbar.css';
import {Link, useNavigate} from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const [userLog, setUserLog] = useState(user)


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUserLog(null);
    navigate('/');
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link className="logo" to="/">
          <span className="logoText">Kushal Booking</span>
        </Link>
        <div className="navItems">
          {userLog ? (
            <>
            <span>Welcome back<b> {user.username}</b></span>
            <img className='userImg' src={user.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="ProfileImage" />
            <button className='navBtn' onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <button className="navBtn" onClick={()=>navigate('/register')}>Register</button>
              <button className="navBtn" onClick={()=>navigate('/login')}>Login</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar