import React, { useState } from 'react'
import { userInputs } from './userInput.jsx'
import { FaImage } from "react-icons/fa";
import './register.css'
import { useNavigate } from 'react-router';
import axios from 'axios';


const Register = () => {
  const [imgFile, setImgFile] = useState('');
  const [info, setInfo] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value }));
  }

  const handleSubmit =async (e)=>{
    e.preventDefault();
    const data = new FormData();
    data.append("file",imgFile);
    data.append('upload_preset','upload_preset')
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dxwc00mao/image/upload",data);
      console.log(uploadRes.data);

      const {url} = uploadRes.data;

      const newUser = {
        ...info,
        img: url
      };

      const res = await axios.post("http://localhost:3200/api/auth/register", newUser);
      console.log(res.data)
      navigate('/login')
    }catch(error){
      console.error("Error uploading file:", error);
      console.error("Error uploading file:", error.response.data.error);
    }
    console.log(info)
  }

  return (
    <div className="newUser" >
    <div className="newContainer">
      <div className="top">
        <h1>Register</h1>
      </div>
      <div className="bottom">
        <div className="left">
        <img
            src={imgFile? URL.createObjectURL(imgFile):"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
            alt=""
          />
        </div>
        <div className="right">
          <form action="">
            <div className="formInput">
              <label htmlFor="file">Choose Image: <FaImage className="icon"/></label>
              <input type="file" id="file" onChange={e=>setImgFile(e.target.files[0])} style={{display:'none'}} />
            </div>

            {userInputs.map(input=>(
              <div className="formInput" key={input.id}>
                <label htmlFor="">{input.label}</label>
                {/* <input onChange={(e)=>handleChange(e)} type={input.type} id={input.id} placeholder={input.placeholder} /> */}
                <input onChange={handleChange} type={input.type} id={input.id} placeholder={input.placeholder} />
              </div>
            ))}
            {/* <button onClick={(e)=>handleSubmit(e)}>Send</button> */}
            <button onClick={handleSubmit}>Send</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Register