import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import './style.css';
import { createRoutesFromChildren } from 'react-router-dom';
import { REACT_APP_API } from '../../context/helper';
const ProductsPerPage = () => {
    const [number, setNumber] = useState('');

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Check if the input is a valid number (non-negative)
    if (!isNaN(value) && value >= 0) {
      setNumber(value);
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try{
        const {data}  =await axios.post(`${REACT_APP_API}/api/v1/product/product-per-page`,{numberOfProduct:number});
        toast.success(data?.message);
    }catch(error){
        toast.error("Something went wrong");
    }

  };

  useEffect(()=>{
getNumberOfProductsPerPage();
  },[]);

  const getNumberOfProductsPerPage =async()=>{
    try{
        const {data} = await axios.get(`${REACT_APP_API}/api/v1/product/get-product-per-page`);
        setNumber(data?.productPerPage);

    }catch(error){
        toast.error("Something went wrong");
    }
  }

   
  return (
    <Layout title={"Products per page"}>
      <div className="container-fluid m-3 p-3 ">
      <div className="row">

        <div className="col-md-3">
          <AdminMenu/>
        </div>

        <div className="col-md-9 mt-4 ">
            <h3>Set Number of products per page</h3>       
            <i><p>Currently you are showing total {number} products per page</p> </i>
            <form onSubmit={(event) => handleSubmit(event)}>
        <div className="mb-3">
          <label htmlFor="numberInput" className="form-label">
            Enter a Number (0 or greater):
          </label>
          <input
            type="number"
            className="form-control text-center"
            id="numberInput"
            value={number}
            onChange={handleInputChange}
            min="0"
            step="1"
            required
            style={{ width: '200px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
 
           
        </div>

      </div>
      </div>
    </Layout>
  )
}

export default ProductsPerPage
