import './reserve.css'
import React, { useContext, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa';
import useFetch from '../../hooks/useFetch';
// import {SearchContext} from '../../context/SearchContexts';
import { SearchContext } from '../../Context/SearchContext';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Reserve = ({setOpen, hotelId}) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const {data, loading, error} = useFetch(`http://localhost:3200/api/hotels/room/${hotelId}`)
  // console.log(data)

  const {date} = useContext(SearchContext); // this is the count of dates

  const getDatesInRange = (startDate, endDate)=>{
    const start = new Date(startDate);
    const end = new Date(endDate);
    // console.log(start, ' --and-- ', end)

    const date = new Date(start.getTime());
    // console.log(date)

    const datesList = [];

    while (date <= end){
      datesList.push(new Date(date).getTime());
      date.setDate(date.getDate()+1);
    }
    return datesList;
  }

  const allDates = (getDatesInRange(date[0].startDate, date[0].endDate))

  const isAvailable = (roomNumber)=>{
    const isFound = roomNumber.unavailableDates.some((date)=>
    allDates.includes(new Date(date).getTime())
  );
  console.log('isFound: ', isFound)
  return !isFound;
  }

  const handleSelectChange =(e)=>{
    const checked  = e.target.checked;
    const value = e.target.value; // it is id of one selected or checked room
    console.log('inside checkbox: ', checked,'and value :', value)
    setSelectedRooms(checked ? [...selectedRooms, value] : 
      selectedRooms.filter(item=>item !== value))
  }

  // console.log(selectedRooms)

  const handleReserveClick = async()=>{
    try{
      await Promise.all(selectedRooms.map(roomId=>{
        const res = axios.put(`http://localhost:3200/api/rooms/availability/${roomId}`,{dates: allDates})
        console.log(res)
        return res.data
      }));
      setOpen(false);
      navigate('/');
    }
    catch(err){
      console.log('Error in reserving room : ',err)
    }

  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FaRegTimesCircle
          className="rCloseIcon"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data &&
          data.map((item) => (
            <div className="rItem">
              <div className="rItemInfo" key={item._id}>
                <p className="rTitle">{item.title}</p>
                <p className="rDescription">{item.description}</p>
                <p className="rMax">
                  Max people: <b>{item.maxPeople}</b>
                </p>
                <p className="rPrice">Rs {item.price} /-</p>
              </div>
              <div className="rSelectRooms">
              {item.roomNumbers.map((roomNum) => (
                <div className="room" key={roomNum._id}>
                  <label htmlFor="">{roomNum.number}</label>
                  <input
                    type="checkbox"
                    value={roomNum._id}
                    onChange={handleSelectChange}
                    disabled={!isAvailable(roomNum)}
                  />
                </div>
              ))}
            </div>
            </div>
          ))}
        <button className="rBtn" onClick={handleReserveClick}>
          Reserve Now!
        </button>
      </div>
    </div>
  );
}

export default Reserve