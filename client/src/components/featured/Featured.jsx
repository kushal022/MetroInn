import React from "react";
import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3200/api/hotels/countByCity?cities=Alwar,Jaipur,Delhi"
  );

  return (
    <section className="featured">
      {loading ? (
        "Loading please wait.."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.fTU8R11pVlswtruq5puqbQHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img1"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Alwar</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.Zis2cXdglxbZemS3QNsdZQHaE8?w=284&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img2"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Jaipur</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
{/* ---------------------------------- */}
          {/* <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://th.bing.com/th/id/OIP.FtudhIBH-HYhxMpS4TU-sAHaE8?w=283&h=189&c=7&r=0&o=5&pid=1.7"
              alt="img3"
              className="featuredImage"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div> */}
        </>
      )}
    </section>
  );
};

export default Featured;
