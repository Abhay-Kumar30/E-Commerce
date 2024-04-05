import React,{useState,useEffect} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { REACT_APP_API } from '../../context/helper';
const Products = () => {
    const [products, setProducts]=useState([]);

    useEffect(()=>{
      getAllProducts();
  },[]);

    // get all products
    const getAllProducts = async()=>{
        try{
                const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/get-product`);
                setProducts(data?.products);
            }catch(error){ toast.error("Something went wrong"); }
       }

  return (
    
    <Layout title={"Products"}>
      {/* <div className="container-fluid m-3 p-3"> */}
      <div className="row">

        <div className="col-md-3">
          <AdminMenu/>
        </div>

        <div className="col-md-9 mt-3">
             <h1 className="text-center">All product list</h1>
             <div className='d-flex flex-wrap'>

                     {products?.map((p) => (
                        <Link className="product-link" key={p?._id} to ={`/dashboard/admin/product/${p?.slug}`}>
                        <div className="card m-2" style={{width: '18rem'}} >

                             <img src={`${REACT_APP_API}/api/v1/product/product-photo/${p?._id}`} className="admin-product card-img-top" alt={p?.name} />
                             <div className="card-body">
                                 <h5 className="card-title"> {p?.name}  </h5>
                                 <p className="card-text">   {p?.description.substring(0,30)}...</p>
                                 <p className="card-text">   $ {p?.price}</p>               
                             </div>
            
                        </div>
                        </Link>

                     ))}
             </div>
        </div>

      </div>
      {/* </div> */}
    </Layout>
  )
}

export default Products
