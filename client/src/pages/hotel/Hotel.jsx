import React, { use, useContext, useState } from 'react';
import './hotel.css';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import MailList from '../../components/mailList/MailList';
import Footer from '../../components/footer/Footer';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRegTimesCircle } from "react-icons/fa";
import { GoLocation } from 'react-icons/go';
import { useLocation, useNavigate } from 'react-router';
import useFetch from '../../hooks/useFetch';
import { SearchContext } from '../../Context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../components/reserve/Reserve';

const Hotel = () => {
  const [sliderNumber, setSliderNumber] =  useState(0);
  const [open , setOpen] = useState(false); // this is for slider
  const [openReserveModal , setOpenReserveModal] = useState(false); // this is for Book/Reserve
  const location = useLocation();
  const id = location.pathname.split("/")[2]
  
  const { data, loading, error, reFetchData } 
  = useFetch(`http://localhost:3200/api/hotels/find/${id}`);
  
  // Context Api:
  const {user} = useContext(AuthContext);
  const {date, options} = useContext(SearchContext);
  // console.log(date)

  const navigate = useNavigate();

  // Functionality for Date Difference
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2)=>{
      const timeDiff = Math.abs(date2.getTime()- date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
      return diffDays;
  }
  const days = (dayDifference(date[0].endDate, date[0].startDate));
  const totalPrice = (days * data.cheapestPrice * options.room)
  

  // Handle Slider--------------
  const handleOpen =(i)=>{
    setSliderNumber(i);
    setOpen(true);
  }

  const handleMoveSlide=(direction)=>{
    let newSlidNumber;
    if(direction ==='l'){
      newSlidNumber = sliderNumber === 0 ? photos.length-1 : sliderNumber -1;
    }
    else{
      newSlidNumber = sliderNumber === photos.length-1 ? 0 : sliderNumber +1;
    }
    // update state
    setSliderNumber(newSlidNumber);
  }

  //! Handle Reserve or Book now
  const handleReserveBtn = ()=>{
    console.log('reserve btn clicked')
    if(user){
      setOpenReserveModal(true);
    }
    else{
      navigate('/login');
    }
  }

  const photos = [
    // "https://th.bing.com/th/id/OIP.fTU8R11pVlswtruq5puqbQHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.fTU8R11pVlswtruq5puqbQHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=284&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7",
    // "https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=284&h=189&c=7&r=0&o=5&pid=1.7",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232826678.jpg?k=c2525bacad7611054df93b85a60fcdf6b06bfcee49431b7a32545b67d43f0229&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/471052508.jpg?k=bc54c3d76e6ba6b5ded590faec055c28bea90093295dab1a4af825479a0ea2ec&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max500/470755135.jpg?k=7e3fbd6bcecf640ef534305bc3f3e3ee7b3146fd5334aad7c9e41da0c16dbd27&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/470755345.jpg?k=0dcbf3927a040276bb1599e284207db92c54e59aad132a3f15113abd84cb0301&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max300/470756016.jpg?k=f2a247fa6045b3b515d96252b79dda5a2a637172c77308e0a9d14e3eec397e96&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470756058.jpg?k=7119a422f983fcba6b70b61730af26a3e49337b99d022c872e71965c5b980007&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470756207.jpg?k=e6f71fc3fc65cb4becb63a1c587cad9dae4a348b094623ac8fd358c4feeaa024&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470977612.jpg?k=f12832ab911dab4252224231d49f7e74bd95827624f18e3ac1b2bc0a7a8aedd2&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/471044005.jpg?k=9f03f0408615f0abe9f1144c6f9944d72bf082b7d6331cbbf2dd3b775f66901e&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470977611.jpg?k=262ae531886cbe90cc814e5f89a88d257449b5773e6a126af885cd79ecec34d9&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470977083.jpg?k=79952a4c533997de740112049893da98ed79172b53e984e22661f9347c75389e&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/470977612.jpg?k=f12832ab911dab4252224231d49f7e74bd95827624f18e3ac1b2bc0a7a8aedd2&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/471048745.jpg?k=3ccd8ef9631d53326528df692dac6ce5879765ee57fc2af611fe7474697f2f01&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/540289832.jpg?k=8952a120fb9c8000f53f18000430e725d9c2aa1954668aab17998776fcedfff2&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216487.jpg?k=55372198e366edae1709fcfc5291bdd457427383bf9f292da8150fbd4b6822a0&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216477.jpg?k=16494eae3a9a9644fe099f722691c72d04f2b81f43095b4f1e786d517156a704&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216475.jpg?k=ac31ccb4e999da4c2f672b85bfaa099d42c49992aebc56c59e10eb9317ec85c7&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216468.jpg?k=64f5d10ce832ce20706bffdc131e157db5b794dd97d460656c6b139fb47ea869&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216472.jpg?k=6b6162af8e15faf48c3dd0229d013dc93846d07919545aa7389a5a5f7f988e81&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216491.jpg?k=37f8db2778228df0d0e1a2ed6fd2c6a7d02ddabff2edad68c3456dcb525b5dba&o=&hp=1",
      // "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216502.jpg?k=7ff80d1d6bce7c62fb32f10873d3a046949fa621de854dacfe6b882e311ee06e&o=&hp=1",
      // "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216506.jpg?k=2b37b1eb95551364246ded4fb879aaa23b89c0e03e26c4d0fa4839aee5c06d6a&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/643216464.jpg?k=53b95f7c1502a69fc19ea392d3784719e31b2f45b3daa94d4d0d92a467786cfe&o=&hp=1"
  ]
  return (
    <div>
      <Navbar/>
      <Header type="list" />
      { loading ? ("Loading") : (<><div className="hotelContainer">
        { open && 
        <div className="slider">
          <FaRegTimesCircle className='closeIcon' onClick={()=>setOpen(false)} />
          <FaArrowAltCircleLeft className='arrowIcon' onClick={()=>handleMoveSlide('l')} />
          <div className="sliderWrapper" >
            <img src={photos[sliderNumber]} alt="" className="sliderImg" />
          </div>
          <FaArrowAltCircleRight className='arrowIcon' onClick={()=>handleMoveSlide('r')}/>
        </div>
        }
        <div className="hotelWrapper">
          <button className="bookNowBtn" onClick={handleReserveBtn}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <GoLocation/>
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">{data.distance}</span>
          <span className="hotelPriceHighlight">
            Book a stay over Rs {data.cheapestPrice}/- at this property and get a free airport taxi
          </span>

          <div className="hotelImages">
            {photos && photos.map((photo,i)=>(
              <div className="hotelImgWrapper" key={i} >
                <img onClick={()=>handleOpen(i)} src={photo} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
        </div>
              {/* ------------------- Hotel Details Container ------------------ */}
        <div className="hotelDetails">
          <div className="hotelDetailsTexts">
            <h1 className="hotelTitle">{data.title}</h1>
            <p className="hotelDescription">{data.description}</p>
          </div>
          <div className="hotelDetailsPrice">
            <h1>Perfect for a {days}-night stay!</h1>
            <span>Located in the real heart of Alwar, this property has an excellent location score of 9.9!</span>
            <h2><b>Rs {totalPrice}/- </b>({days} nights)</h2>
            <button onClick={handleReserveBtn}>Reserve or Book Now!</button>
          </div>
        </div>
      <MailList/>
      <Footer/>
      </div>
      </>)}
      {/* -------------------- if LoggedIn user --------------------- */}
      {openReserveModal && <Reserve setOpen={setOpenReserveModal} hotelId={id} /> }
    </div>
  )
}

export default Hotel