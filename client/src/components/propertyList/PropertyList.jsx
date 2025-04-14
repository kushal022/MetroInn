import React from 'react';
import './propertyList.css'
import useFetch from '../../hooks/useFetch';

const PropertyList = () => {
  const {data,loading,error}= useFetch('http://localhost:3200/api/hotels/countByType');
  const images = [
    "https://th.bing.com/th/id/OIP.fTU8R11pVlswtruq5puqbQHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=284&h=189&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
  ]
  return (
    <div className='pList' >
      {
        loading ? (
          "Loading.."
        ):(
          <>
          {
            data && images.map((img,index)=>{
              return (
                <div className="pListItem" key={index}>
                  <img
                    src={img}
                    alt="img1"
                    className="pListImage"
                  />
                  <div className="pListTitles">
                    <h1>{data[index]?.type}</h1>
                    <h2>{data[index]?.count} {data[index]?.type}</h2>
                  </div>
                </div>
              );
            })
          }
          </>
        ) 
      }
      
    </div>
  )
}

export default PropertyList