import React from "react";
 import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { REACT_APP_API } from "../context/helper";
const Search = () => {

  const navigate=useNavigate();
 const [ values, setValues] = useSearch();
 const [ auth,   setAuth  ] = useAuth();
 const [ cart,   setCart  ] = useCart();

 //  add to cart
 const addToCart = async(product,buyerID)=>{

         try{
               const {data} =await axios.post(`${REACT_APP_API}/api/v1/cart/cart-product/${product?._id}/${buyerID}`)
               toast.success(data?.message);
             }catch(error){ toast.error("Something went wrong"); }

              // add products in local storage
              setCart([...cart,product]);                              
              localStorage.setItem("cart", JSON.stringify([...cart,product]));
              toast.success('Item added to cart');
         }
  return (
    <Layout title = {"Search Results"}>
       <div className = "container">
         <div className = "mt-3">

           <h1 className='text-center'> Search Resuts </h1>
           <h6 className='text-center'> {values?.results?.length < 1  ? "No Products Found" : `Found ${values?.results?.length}`} </h6>
           <div className = "d-flex justify-content-center flex-wrap mt-4">
             {values?.results.map((p,index) => (

               <div key = { index } className = "card m-2" style={{ width: "18rem" }}>
                   <img src = {`${REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}  className = "search-image card-img-top" alt = {p?.name} />
                   
                   <div className = "card-body">
                      <h5 className = "card-title"> {p?.name}</h5>
                      <p className = "card-text"> $ {p?.price}</p>
                      <button className = "btn btn-primary ms-1 searchButton"  onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                      <button className="btn btn-secondary ms-1 homeButton" disabled={!auth || !auth.user || !auth.user._id} onClick={() => addToCart(p, auth?.user?._id)} > Add to cart </button>
                   </div>
               </div>

             ))}
           </div>
         </div>
       </div>
     </Layout>
   );
};

export default Search;