import React, { useState, useEffect } from "react";
import Layout                         from "./../components/Layout/Layout";
import axios                          from "axios";
import { useParams, useNavigate }     from "react-router-dom";
import { useCart }                    from "../context/cart";
import toast                          from "react-hot-toast";
import { useAuth }                    from "../context/auth";
import { REACT_APP_API } from "../context/helper";
const ProductDetails = () => {

  const params = useParams();
  const navigate                                = useNavigate();
  const [ product, setProduct ]                 = useState({});
  const [ relatedProducts, setRelatedProducts ] = useState([]);
  const [ cart,setCart ]                        =useCart();
  const [ auth,setAuth ]                        =useAuth();

  //initalp details
  useEffect(() => {
           // if we have slug only then we call to getProduct()
           if (params?.slug) getProduct();
         }, [params?.slug]);

  //getProduct
  const getProduct = async () => {
    try {
          const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/get-product/${params?.slug}` );
          setProduct(data?.product);

          // we also call the getSimilarProduct when we visit on product detail page
          getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) { toast.error("Something went wrong"); }
     };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
           const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
           setRelatedProducts(data?.products);
         } catch (error) { toast.error("Something went wrong"); }
      };

  // // add to cart
  const addToCart = async(product,buyerID)=>{

        try{
              const data =await axios.post(`${REACT_APP_API}/api/v1/cart/cart-product/${product?._id}/${buyerID}`)
              data && toast.success("Product added in cart")
           
            }catch(error){  toast.error("Something went wrong"); }

                // add products in local storage
                setCart([...cart,product]);                              
                localStorage.setItem("cart", JSON.stringify([...cart,product]));
                toast.success('Item added to cart');
         }
  return (
    <Layout>
      <div className="row container mt-2 more-detail-product">
        <div className="col-md-6">
          <img
            src={`${REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top main-image"
            alt={product?.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>Price : {product?.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="btn btn-secondary ms-1 homeButton" disabled={!auth || !auth.user || !auth.user._id} onClick={() => addToCart(product, auth?.user?._id)} > Add to cart </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products on the basis of category</h6>
        {relatedProducts?.length ===0 ? (<> <p className="text-center">No Similar Products found</p></>

           ):(   

        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p,index) => (
            <div key={index} className="more-detail-product card m-2" style={{ width: "18rem" }}>
              <img
                src={`${REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                className=" similar-image card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                   <h5 className="card-title">{p.name}</h5>
                   <p className="card-text">{p.description.substring(0, 30)}...</p>
                   <p className="card-text"> $ {p.price}</p>
                   <button className="btn btn-primary ms-1"  onClick={() => navigate(`/product/${p.slug}`)} > More Details </button>             
                   <button className="btn btn-secondary ms-1 homeButton" disabled={!auth || !auth.user || !auth.user._id} onClick={() => addToCart(p, auth?.user?._id)} > Add to cart </button>
               
              </div>
            </div>
          ))}
        </div>
        
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;