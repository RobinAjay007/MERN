import React, { useEffect, useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom'

const Search = () => {
  const navigate = useNavigate();
  const loacation=useLocation();
  const [keyWord, setKeyWord] = useState("");
  console.log(keyWord)
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
        navigate(`/search/${keyWord}`);
      } else {
        navigate('/'); // Optionally, navigate to the homepage if no keyword is entered
      }
  };
  const clearKeyword=()=>{
    setKeyWord('')
  }

  useEffect(()=>{
    if(loacation.pathname ==='/'){
        clearKeyword()
    }
  },[loacation])
  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          value={keyWord}
          onChange={(e) => {
            return setKeyWord(e.target.value);
          }}
          className="form-control"
          placeholder="Enter Product Name ..."
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn" type="submit">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
};

export default Search;
