import React from 'react';
import './searchItem.css'
import { Link } from 'react-router';

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
        <img 
            src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
            alt="" 
            className="siImg" 
        />
        <div className="siDescription">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">
                Apartment with Air Conditioning
            </span>
            <span className="siFeatures">
                {item.description}</span>
            <span className="siCancelOp">Free cancellation</span>
            <span className="siCancelOpSubtitle">
                You can cancel later, so lock in this great price today!
            </span>
        </div>
        {/* ------------ Details Container-------------- */}
        <div className="siDetail">
        {item.rating &&  <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
            <span className="siPrice">{item.cheapestPrice}</span>
            <span className="siTaxOp">Include taxes and fees</span>
            <Link to={`/hotels/${item._id}`} >
            <button className="siCheckButton">See availability</button>
            </Link>
        </div>
        </div>
    </div>
  )
}

export default SearchItem;


//!-------------------------------------------
// import React from 'react'

// const SearchItem = ({item}) => {
//   return (
//     <div className='searchItem' >
//         <img src={item.photos[0]} alt={item.name} />
//         <div className="siDescription">
//             <h1 className="siTitle">{item.name} </h1>
//             <span className="siDistance">{item.distance}</span>
//             <span className="siTaxiOp">Free airport taxi</span>
//             <span className="siSubtitle">
//                 Apartment with Air Conditioning
//             </span>
//             <span className="siFeatures">
//                 {item.description}
//             </span>
//             <span className="siCancelOp">Free cancellation</span>
//             <span className="siCancelOpSubtitle">
//                 You can cancel later.
//             </span>
//         </div>
//         <div className="siDetails">
//             {item.rating && <div className="siRating">
//                 <span>Excellent</span>
//                 <button>{item.rating}</button>
//             </div>}
//             <div className="siDetailTexts">
//                 <span className="siPrice">{item.cheapestPrice}/-</span>
//                 <span className="siTaxOn">Includes taxes and fees</span>
//                 <a href={`/hotels/${item._id}`}>
//                 <button className="siCheckBtn">See availability</button>
//                 </a>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default SearchItem