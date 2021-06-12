import "../../App.css";
import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import api from "../../utils/api";
import MovieCard from "../../components/MovieCard";
import Searcher from "../../components/search";
import Loader from "../../components/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const Dashboard = () => {
  const [searchMovies, setSearchMovies] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("conjur");
  const [length, setLength] = useState(2);
  const [year, setYear] = useState();

 
  useEffect(() => {
    api.initailLibrary().then((res) => {
      setSearchMovies(res.Search);
      setLoader(false);
    });
   
  }, []);

  const getMovieDetails = (movies, keyword,year) => {
    setSearchMovies(movies);
    setSearchKeyword(keyword);
    setYear(year)
  };

  const getloaderStatus = (status) => {
    if (status === true) {
      setSearchMovies([]);
    }
    setLoader(status);
  };
  const fetchMoreData = () => {
    api.searchResults(searchKeyword, length,year).then((res) => {
      if (res.Response === "True") {
        setLength(length + 1);
        setSearchMovies([...searchMovies, ...res.Search]);
        setLoader(false);
      } else {
       
      }
    });
  };

  return (
    <div className="dashboard-container">
      <div className="inner-container">
        <div className="search-field">
          <Searcher
            movieDetails={getMovieDetails}
            getloaderStatus={getloaderStatus}
          />
        </div>
        <div>
          <InfiniteScroll
            dataLength={searchMovies.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<div className="infinite-loader"><h4>Loading...</h4></div>}
          >
              <div className="poster-list-container">
              {searchMovies.map((item) => {
                return (
                  <MovieCard
                    poster={item.Poster}
                    released={item.Year}
                    title={item.Title}
                    id={item.imdbID}
                    type={item.Type}
                  />
                );
              })}
              </div>
            
         
          
          </InfiniteScroll>

          {loader && (
            <div className="loader-container">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
