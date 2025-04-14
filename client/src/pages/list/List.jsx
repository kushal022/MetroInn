import React, { useState } from 'react';
import './list.css';
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { useLocation } from 'react-router';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';

const List = () => {
  const location = useLocation();
  // console.log(location)
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const { data, loading, error, reFetchData } 
  = useFetch(`http://localhost:3200/api/hotels?city=${destination}&min=${min||0}&max=${max||1000000000}`);

// console.log('data in list :',data)

const handleSearchClick = ()=>{
  reFetchData(`http://localhost:3200/api/hotels?city=${destination}&min=${min||0}&max=${max||100000000}`);
}

  return (
    <div>
      <Navbar/>
      {/* ----- Header with type (like it is in list/hotels page) */}
      <Header type='list' />
      <div className="listContainer">
        <div className="listWrapper">
          {/* ----- List Search ------------ */}
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor="">Destination</label>
              <input type="text" onChange={(e)=>setDestination(e.target.value)} placeholder={destination} />
            </div>
            <div className="lsItem">
              <label htmlFor="">Check-in date</label>
              <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate,'dd/MM/yyyy')} to 
              ${format(date[0].endDate,'dd/MM/yyyy')}`}</span>
              { openDate &&
              <DateRange
                onChange={item => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptions">
              <div className="lsOptionItem">
                <span className="lsOptionText">Min price <small>per night</small></span>
                <input type="number" onChange={(e)=>setMin(e.target.value)} className='lsOptionInput' />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Max price <small>per night</small></span>
                <input type="number" onChange={(e)=>setMax(e.target.value)} className='lsOptionInput' />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Adult</span>
                <input type="number" className='lsOptionInput' min={1} placeholder={options.adult} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Children</span>
                <input type="number" className='lsOptionInput' min={0} placeholder={options.children} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">Room</span>
                <input type="number" className='lsOptionInput' min={1} placeholder={options.room}/>
              </div>
              </div>
            </div>
            <button onClick={handleSearchClick} >Search</button>
          </div>
          {/* ----- List Search Result------ */}
          <div className="listResult">
            { loading ? <p>Loading..</p> :
            <>
              {data && data.map(item=>(
                <SearchItem item={item} key={item._id} />
              ))}
            </>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default List



//!--------------------------------------------------------
// import React, { useDebugValue, useState } from "react";
// import { useLocation } from "react-router-dom";
// import useFetch from "../../hooks/useFetch";

// import Navbar from "../../components/navbar/Navbar";
// import Header from "../../components/header/Header";
// import SearchItem from "../../components/searchItem/SearchItem";

// const List = () => {
  // const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);
  // const [date, setDate] = useState(location.state.date);
  // const [openDate, setOpenDate] = useState(false);
  // const [options, setOptions] = useState(location.state.options);
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);

  // const { data, loading, error, reFetchData } = useFetch(`http://localhost:3200/api/hotels?city=${destination}&min=${min||0}&max=${max||2999}`);
  
  // const handleClick= ()=>{
  //   reFetchData();
  // }

//   return (
//     <div>
//       <Navbar />
//       {/* <Header type="list" /> */}
//       <div className="listContainer">
//         <div className="listWrapper">
//           <div className="listSearch">
//             <h1 className="lsTitle">Search</h1>
//             <div className="lsItem">
//               <label htmlFor="">Destination</label>
//               <input type="text" placeholder={destination} />
//             </div>
//             <div className="lsItem">
//               <label htmlFor="">Check-in Date</label>
//               <span onClick={() => setOpenDate(!openDate)}>
//                 {`${format(date[0].startDate, "MM/dd/yyyy")} to 
//                             ${(format(data[0].endDate), "MM/dd/yyyy")} `}
//               </span>
//               {openDate && (
//                 <DateRange
//                   onChange={(item) => setDate([item.selection])}
//                   minDate={new Date()}
//                   ranges={data}
//                 />
//               )}
//             </div>
//             <div className="lsItem">
//               <label htmlFor="">Option</label>
//               <div className="lsOptions">
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Min price <small>per night</small>
//                   </span>
//                   <input type="number" onChange={e=> setMin(e.target.value)} className="lsOptionInput" />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">
//                     Max price <small>per night</small>
//                   </span>
//                   <input type="number" onChange={e=> setMax(e.target.value)} className="lsOptionInput" />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Adult</span>
//                   <input
//                     type="number"
//                     className="lsOptionInput"
//                     min={1}
//                     placeholder={options.adult}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Children</span>
//                   <input
//                     type="number"
//                     className="lsOptionInput"
//                     min={0}
//                     placeholder={options.children}
//                   />
//                 </div>
//                 <div className="lsOptionItem">
//                   <span className="lsOptionText">Room</span>
//                   <input
//                     type="number"
//                     className="lsOptionInput"
//                     min={1}
//                     placeholder={options.room}
//                   />
//                 </div>
//               </div>
//             </div>
//             <button onClick={handleClick} >Search</button>
//           </div>
//           <div className="listResult">
//             {loading ? (
//               "Loading.."
//             ) : (
//               <>
//                 {data.map((item) => (
//                   <SearchItem item={item} key={item._id} />
//                 ))}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default List;
