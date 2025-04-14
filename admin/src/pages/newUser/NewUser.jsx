import "./newUser.scss";
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from 'axios';

const NewUser = ({inputs}) => {
  const [imgFile, setImgFile] = useState('');
  const [info, setInfo] = useState({});

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
    }catch(error){
      console.error("Error uploading file:", error);
      console.error("Error uploading file:", error.response.data.error);
    }
    console.log(info)
  }

  return (
    <div className="new" >
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New User</h1>
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
                <label htmlFor="file">Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                <input type="file" id="file" onChange={e=>setImgFile(e.target.files[0])} style={{display:'none'}} />
              </div>

              {inputs.map(input=>(
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

export default NewUser;

// import "./new.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { useState } from "react";

// const New = ({ inputs, title }) => {
//   const [file, setFile] = useState("");

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 file
//                   ? URL.createObjectURL(file)
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   onChange={(e) => setFile(e.target.files[0])}
//                   style={{ display: "none" }}
//                 />
//               </div>

//               {inputs.map((input) => (
//                 <div className="formInput" key={input.id}>
//                   <label>{input.label}</label>
//                   <input type={input.type} placeholder={input.placeholder} />
//                 </div>
//               ))}
//               <button>Send</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;
