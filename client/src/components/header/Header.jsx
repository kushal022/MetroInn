import React, { Children, useContext, useState } from 'react';
import './header.css';
import { FaBed, FaCalendarDay, FaCar, FaPlane, FaTaxi } from "react-icons/fa";
import { GoPerson, GoPersonFill } from "react-icons/go";
//!-- import React Date Range
import {DateRange} from 'react-date-range';
//!-- import React Date Range Css Lib
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
//!-- import React Date Formate Function
import {format} from 'date-fns'
import { useNavigate } from 'react-router';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
// import {SearchContext} from '../../context/SearchContext.jsx'

const Header = ({type}) => {
  const {user} = useContext(AuthContext);
  const [destination, setDestination] = useState("");
  const navigate = useNavigate();
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  })
  const handleOption = (name, operation)=>{
    setOptions((prev)=>{
      return{
        ...prev,
        [name]: operation === 'i' ? options[name] + 1 : options[name] -1,
      }
    })
  }

  //---- Context api
  const {dispatch} = useContext(SearchContext);

  const handleSearch = ()=>{
    // ---- dispatch Action to SearchContext
    // ---- This action will be handled by SearchReducer in SearchContext.jsx
    // ---- This will update the state of SearchContext.jsx
    // ---- And then this updated state will be passed to the SearchPage component
    // ---- So that SearchPage component can get the new state and update its UI accordingly
    dispatch({type: "NEW_SEARCH", payload: {destination, date, options}})
    // ---- Navigate to Search Page
    navigate('/hotels' , {state:{ destination, date, options }} );
    console.log("hello Search button clicked in header")
  }


  return (
    <main className="header">
      <section className={type === 'list' ? "headerContainer listMode": 'headerContainer'}>
        <div className="headerList">
          {/* ---- header List Items --------------- */}
          <div className="headerListItem active">
            <FaBed />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FaPlane />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FaCar />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FaBed />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FaTaxi />
            <span>Airport taxis</span>
          </div>
        </div>
        {/* ---- header Title --------------- */}
        {/* here type use for header like where it is use */}
        {type !== "list" && (
          <>
            {" "}
            <h1 className="headerTitle">Find your next stay</h1>
            <p className="headerDesc">
              Search deals on hotels, homes, and much more with KushalBooking...
            </p>
            {!user && <button onClick={()=>navigate('/login')} className="headerBtn">Sign in / Register</button>}
            {/* ---- Header Search Box --------------- */}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FaBed className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going:"
                  className="headerSearchInput"
                  onChange={(e)=>{setDestination(e.target.value)}}
                />
              </div>
              <div className="headerSearchItem">
                <FaCalendarDay className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {`${format(date[0].startDate, "dd/MM/yyyy")}
              to
              ${format(date[0].endDate, "dd/MM/yyyy")}`}
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <GoPersonFill className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                >
                  {`${options.adult} adult : ${options.children} children : ${options.room} room`}
                </span>
                {/* ---- Option Box ---- */}
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "d")}
                          disabled={options.adult <= 1}
                        >
                          -
                        </button>
                        <span className="optionText">{options.adult}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "d")}
                          disabled={options.children <= 1}
                        >
                          -
                        </button>
                        <span className="optionText">{options.children}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "d")}
                          disabled={options.room <= 1}
                        >
                          -
                        </button>
                        <span className="optionText">{options.room}</span>
                        <button
                          className="optionCounterBtn"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default Header
//!-------------------------------------
// import {
//   faBed,
//   faCalendarDays,
//   faCar,
//   faPerson,
//   faPlane,
//   faTaxi,
// } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import "./header.css";
// import { DateRange } from "react-date-range";
// import { useContext, useState } from "react";
// import "react-date-range/dist/styles.css"; // main css file
// import "react-date-range/dist/theme/default.css"; // theme css file
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import { SearchContext } from "../../context/SearchContext";
// import { AuthContext } from "../../context/AuthContext";

// const Header = ({ type }) => {
  // const [destination, setDestination] = useState("");
  // const [openDate, setOpenDate] = useState(false);
  // const [dates, setDates] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  // const [openOptions, setOpenOptions] = useState(false);
  // const [options, setOptions] = useState({
  //   adult: 1,
  //   children: 0,
  //   room: 1,
  // });

  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext);


  // const handleOption = (name, operation) => {
  //   setOptions((prev) => {
  //     return {
  //       ...prev,
  //       [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
  //     };
  //   });
  // };

  // const { dispatch } = useContext(SearchContext);

  // const handleSearch = () => {
  //   dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
  //   navigate("/hotels", { state: { destination, dates, options } });
  // };

//   return (
//     <div className="header">
//       <div
//         className={
//           type === "list" ? "headerContainer listMode" : "headerContainer"
//         }
//       >
//         <div className="headerList">
//           <div className="headerListItem active">
//             <FontAwesomeIcon icon={faBed} />
//             <span>Stays</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faPlane} />
//             <span>Flights</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faCar} />
//             <span>Car rentals</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faBed} />
//             <span>Attractions</span>
//           </div>
//           <div className="headerListItem">
//             <FontAwesomeIcon icon={faTaxi} />
//             <span>Airport taxis</span>
//           </div>
//         </div>
//         {type !== "list" && (
//           <>
//             <h1 className="headerTitle">
//               A lifetime of discounts? It's Genius.
//             </h1>
//             <p className="headerDesc">
//               Get rewarded for your travels – unlock instant savings of 10% or
//               more with a free Lamabooking account
//             </p>
//             {!user && <button className="headerBtn">Sign in / Register</button>}
//             <div className="headerSearch">
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faBed} className="headerIcon" />
//                 <input
//                   type="text"
//                   placeholder="Where are you going?"
//                   className="headerSearchInput"
//                   onChange={(e) => setDestination(e.target.value)}
//                 />
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
//                 <span
//                   onClick={() => setOpenDate(!openDate)}
//                   className="headerSearchText"
//                 >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
//                   dates[0].endDate,
//                   "MM/dd/yyyy"
//                 )}`}</span>
//                 {openDate && (
//                   <DateRange
//                     editableDateInputs={true}
//                     onChange={(item) => setDates([item.selection])}
//                     moveRangeOnFirstSelection={false}
//                     ranges={dates}
//                     className="date"
//                     minDate={new Date()}
//                   />
//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <FontAwesomeIcon icon={faPerson} className="headerIcon" />
//                 <span
//                   onClick={() => setOpenOptions(!openOptions)}
//                   className="headerSearchText"
//                 >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
//                 {openOptions && (
//                   <div className="options">
//                     <div className="optionItem">
//                       <span className="optionText">Adult</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.adult <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.adult}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("adult", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Children</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.children <= 0}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.children}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("children", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                     <div className="optionItem">
//                       <span className="optionText">Room</span>
//                       <div className="optionCounter">
//                         <button
//                           disabled={options.room <= 1}
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "d")}
//                         >
//                           -
//                         </button>
//                         <span className="optionCounterNumber">
//                           {options.room}
//                         </span>
//                         <button
//                           className="optionCounterButton"
//                           onClick={() => handleOption("room", "i")}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="headerSearchItem">
//                 <button className="headerBtn" onClick={handleSearch}>
//                   Search
//                 </button>
//               </div>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;