import "./newRoom.scss";
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { roomInputs } from "../../formSource";
import  useFetch  from "../../hooks/useFetch.jsx";
import axios from "axios";

const NewRoom = () => {
  const [hotelId,setHotelId] = useState(null);
  const [info,setInfo] = useState({});
  const [rooms,setRooms] = useState([]);

  //Fetch Hotels:
  const {data, loading, error} = useFetch('http://localhost:3200/api/hotels');

  //Handle Change:
  const handleChange =(e)=>{
    setInfo(prev=>({...prev,[e.target.id]:e.target.value}));
  }
  console.log(info)

  //Handle Submit:
  const handleSubmit =async(e)=>{
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(roomNum=>({number:roomNum}))
    try{
      const newRoom = {...info, roomNumbers}
      console.log(newRoom)
      const res = await axios.post(
        `http://localhost:3200/api/rooms/${hotelId}`, newRoom ,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + JSON.parse(localStorage.getItem("token")),
          },
        }
      );
      console.log('New room created: ', res.data)

    }catch(error){
      console.log('Error in create room: ', error)
    }


  }
  return (
    <div className="new" >
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form action="">
              {roomInputs .map(input=>(
                <div className="formInput" key={input.id}>
                  <label htmlFor="">{input.label}</label>
                  <input onChange={handleChange} id={input.id} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="">Rooms</label>
                <textarea onChange={e=>setRooms(e.target.value)} placeholder="Give comma between room numbers"></textarea>
              </div>
              <div className="formInput">
                <label htmlFor="">Choose a hotel</label>
                <select  id="hotelId" onChange={e=>setHotelId(e.target.value)} >
                  {loading?'Loading...': data&&data.map(hotel=>(
                    <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
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

export default NewRoom;

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
