import "./newHotel.scss";
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import  useFetch from '../../hooks/useFetch'
import axios from "axios";

const NewHotel = ({inputs}) => {
  const [hotelImgFiles, setHotelImgFiles] = useState('');
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([])

  const handleChange = (e) => {
    setInfo(prev=>({...prev, [e.target.id]: e.target.value }));
  }

  // console.log(Object.values(hotelImgFiles))
  

  const {data, loading, error} = useFetch('http://localhost:3200/api/rooms');

  const handleSelect = (e) => {

    const selectedRooms = Array.from(e.target.selectedOptions,(option)=> option.value)
    // console.log(selectedRooms) // return selected room's id
    setRooms(selectedRooms);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const list = await Promise.all(
        Object.values(hotelImgFiles).map(async(file)=>{
          const data = new FormData();
          data.append('file',file);
          data.append('upload_preset','upload_preset');
          const uploadRes =await axios.post("https://api.cloudinary.com/v1_1/dxwc00mao/image/upload",data);

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newHotel = {
        ...info, 
        rooms,
        photos: list
      }

      const res = await axios.post('http://localhost:3200/api/hotels', newHotel,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('token'))
      }
      });
      console.log(res.data)

    }catch(error){
      console.log('error in Register new Hotel: ', error)
     }
  }

  return (
    <div className="new" >
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
          <img
              src={hotelImgFiles? URL.createObjectURL(hotelImgFiles[0]):"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
              alt="hotelImage"
            />
          </div>
          <div className="right">
            <form action="">
            <div className="formInput">
                <label htmlFor="file">Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                <input type="file" multiple id="file" onChange={e=>setHotelImgFiles(e.target.files)} style={{display:'none'}} />
              </div>

              {inputs.map(input=>(
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input type={input.type} onChange={handleChange} id={input.id} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="">Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="selectRooms">
                <label htmlFor="">Rooms</label>
                <select  id="rooms" multiple onChange={handleSelect} >
                  {loading?'Loading...': data&&data.map(room=>(
                    <option key={room._id} value={room._id}>{room.title}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleSubmit}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel;

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
