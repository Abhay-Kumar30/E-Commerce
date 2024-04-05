import React from 'react';
import { useSearch } from '../../context/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { REACT_APP_API } from '../../context/helper';
const SearchInput = () => {

    const [values,setValues]=useSearch();
    const navigate= useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
      try{
            const {data}=await axios.get(`${REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({...values, results: data});
            navigate("/search");
            }
            catch(error){
               toast.error("Something went wrong");
            }}
  return (
    
       <div className="search ">
          <form className="d-flex" role="search" onSubmit={handleSubmit}>
           <input className="form-control me-2" onChange={(e)=> setValues({...values, keyword: e.target.value })} type="search" placeholder="Search" aria-label="Search" value={values.keyword} />
           <button className="btn btn-outline-success" type="submit">Search</button>
         </form>
       </div>
  )
}
export default SearchInput
