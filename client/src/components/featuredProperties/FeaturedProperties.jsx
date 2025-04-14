import React from 'react'
import './featuredProperties.css'
import useFetch from '../../hooks/useFetch';
const FeaturedProperties = () => {

  const {data,loading,error}= useFetch('http://localhost:3200/api/hotels?featured=true&limit=4');
  // console.log(data);
  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item) => {
            return (
              <div className="fpItem" key={item._id}>
                <img
                  src="https://th.bing.com/th/id/OIP.fTU8R11pVlswtruq5puqbQHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
                  alt="img"
                  className="fpImg"
                />
                <span className="fpName">{item.name}</span>
                <span className="fpCity">{item.city}</span>
                <span className="fpPrice">
                  Start from {item.cheapestPrice}/-
                </span>
                {item.rating && (
                  <div className="fpRating">
                    <button>{item.rating}</button>
                    <span>{item.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default FeaturedProperties