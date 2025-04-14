import "./singleHotel.scss";
import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import TableComp from '../../components/table/TableComp'
import { useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const SingleHotel = () => {
  const location = useLocation();
  const id = (location.pathname.split('/')[2]);

  // Fetch Data:
  const {data, loading, error} = useFetch(`http://localhost:3200/api/hotels/find/${id}`);
  // console.log(data)
  
  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          {loading? 'Loading..': 
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
            <img
                src={data.photos ? (data.photos[0]):('https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg')}
                alt={data.username}
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.name}</h1>
                <div className="detailItem">
                  {/* <span className="itemKey">Email:</span> */}
                  <span className="itemValue">{data.type}</span>
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Phone:</span> */}
                  <span className="itemValue">{data.title}</span>
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Phone:</span> */}
                  <span className="itemValue">{data.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.city}</span>
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Distance:</span> */}
                  <span className="itemValue">{data.distance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.cheapestPrice}</span>
                </div>
                <div className="detailItem">
                  {/* <span className="itemKey">Price:</span> */}
                  <span className="itemValue">{data.description}</span>
                </div>
              </div>
            </div>
          </div>}
          <div className="right">
            <Chart aspect={3/1} title='User Spending ( Last 6 Months )' />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
            <TableComp/>
        </div>
      </div>
    </div>
  )
}

export default SingleHotel






// import "./single.scss";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";

// const Single = () => {
//   return (
//     <div className="single">
//       <Sidebar />
//       <div className="singleContainer">
//         <Navbar />
//         <div className="top">
//           <div className="left">
//             <div className="editButton">Edit</div>
//             <h1 className="title">Information</h1>
//             <div className="item">
              // <img
              //   src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
              //   alt=""
              //   className="itemImg"
              // />
//               <div className="details">
//                 <h1 className="itemTitle">Jane Doe</h1>
//                 <div className="detailItem">
//                   <span className="itemKey">Email:</span>
//                   <span className="itemValue">janedoe@gmail.com</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Phone:</span>
//                   <span className="itemValue">+1 2345 67 89</span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Address:</span>
//                   <span className="itemValue">
//                     Elton St. 234 Garden Yd. NewYork
//                   </span>
//                 </div>
//                 <div className="detailItem">
//                   <span className="itemKey">Country:</span>
//                   <span className="itemValue">USA</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="right">
//             <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
//           </div>
//         </div>
//         <div className="bottom">
//         <h1 className="title">Last Transactions</h1>
//           <List/>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Single;
