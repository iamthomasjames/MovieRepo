import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import api from "../../utils/api";
import "../../App.css";
const Searcher = (props) => {
  const [searchKeyword, setSearchKeyword] = useState();
  const [year, setYear] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const getMovieResult = () => {
    
    if (searchKeyword.length > 2) {
        if(!isNaN(year) )
        {
            props.getloaderStatus(true);
            api.searchResults(searchKeyword, 1,year).then((res) => {
              if (res.Response === "True") {
                props.movieDetails(res.Search, searchKeyword,year);
                props.getloaderStatus(false);
              } else {
                setErrorMessage("Entered movie is not found with us!!");
                props.getloaderStatus(false);
              }
            });
        }
        else{
            setErrorMessage("Please enter year as a number!!");
        }
     
    } else {
      setErrorMessage("Please enter atleast 3 letter!!");
      props.getloaderStatus(false);
    }
  };

  return (
    <Form>
      <Form.Group widths="equal">
        <Form.Input
          label="Search Movie"
          placeholder="Search movie.."
          onChange={(e) => {
            setErrorMessage();
            setSearchKeyword(e.target.value);
          }}
        />
        <Form.Input
          fluid
          label="Year (optional)"
          placeholder="Enter Year.."
          onChange={(e) => {
            setErrorMessage();
            setYear(e.target.value);
          }}
        />
       
      </Form.Group>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Button onClick={getMovieResult}>Search</Button>
    </Form>
  );
};

export default Searcher;
