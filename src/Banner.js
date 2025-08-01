import React, { useState ,useEffect} from 'react'
import axios from './axios';
import requests from './requests';
import './Banner.css';

function Banner() {
    const [movie, setMovie] = useState();
    useEffect(() => {
      async function fetchData() {
        const request = await axios.get(requests.fetchTrending);
        setMovie(
          request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]
        );
        return request;
      }
      fetchData();
    }, []);

    function truncate(str,n) {
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }
//  this fuction helps to trim the discription  and replace with ....paste form the stackoverflow 

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backdropPosition: "center center",
            }}
        >
            {/* Background image */}
            <div className="banner_contents">
                {/* title */}
                <h1 className="banner_title">
                    {/* // question mark here is optional chaining means if the movie title is null/ undefine it will not through the error just directely print 
                    // the null/undefine */}
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                {/* 2 buttons */}
                <div className="banner_buttons">
                    <button className="banner_button">Play</button>
                    <button className="banner_button">My List </button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 200)}
                </h1>
                {/* description */}
            </div>
            <div className="banner__fadeBottom" />
        </header>
    );
}

export default Banner
