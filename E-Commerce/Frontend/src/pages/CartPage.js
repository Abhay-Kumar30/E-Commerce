import React,{useState,useEffect} from "react";
import { useNavigate }            from "react-router-dom";
import Layout                     from "./../components/Layout/Layout";
import { useCart }                from "../context/cart";
import { useAuth }                from "../context/auth";
import toast                      from "react-hot-toast";
import axios                      from "axios";
import { REACT_APP_API } from "../context/helper";
const CartPage = () => {

  const [ cartItem,setCartItem ] = useState([]);
  const [ status,setStatus ]     = useState("");

  const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [totalNumberOfProducts,setTotalNumberOfProduct]=useState(0);
    const navigate=useNavigate();
  // it use to check whether the user is login or not
  const [ auth, setAuth ]        = useAuth();
  const [ cart, setCart ]        = useCart();

useEffect(()=>{ getCartProduct(); },[]);


useEffect(()=>{ 
                 // we navigate to "home " page if there is no product in the cart
                if(cart.length===0)
                {navigate("/");
                toast.success("You have nothing in the cart,Add something new");
                }
             },[cart]);

const getCartProduct = async() => {
              setLoading(true);
        try{  
              const {data} = await axios.get(`${REACT_APP_API}/api/v1/cart/single-cart-product/${auth?.user?._id}`)
            
               
                if(data?.wholeCart?.products.length===0){
                     setCartItem([]);                    
                     setTotalNumberOfProduct(0); 

                     }else{
                setCartItem(data?.wholeCart?.products); 
                setStatus(data?.wholeCart?.status);                  
                setTotalNumberOfProduct(data?.wholeCart?.products.length);}
                toast.success(data?.message);

             }catch(error){                 
                    setError('Error fetching data');
                }
                   setLoading(false);
                   setError('');
            }
    
  //total price
  const totalPrice = () => {
    try {
          let total = 0;
          cartItem?.map((item) => {
          total = total + item?.price;
          });
          return total;
        } catch (error) { toast.error("Something went wrong"); }
  };

  //detele item
  const removeCartItem = async(productID, buyerID) => {

    try{
         const {data} =await axios.delete(`${REACT_APP_API}/api/v1/cart/delete-cart-product/${productID}/${buyerID}`)
      
           // delete the product from the local storage also
           let myCart = [...cart];
           let index = myCart.findIndex((item) => item._id === productID);;;
           myCart.splice(index, 1);
           setCart(myCart);
           localStorage.setItem("cart", JSON.stringify(myCart));
      
         getCartProduct();
         toast.success(data?.message);
       }catch(error){ toast.error(error.message); }
     
  };

  return (
    <Layout>
       <div className="container bodyMinHeight">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">

              {/* //=> auth?.token means we check whether the user is login or not (i.e does he have token or not?) */}
              {/* if he is loged in then we show his name */}
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
              {cartItem?.length
                ? `You have total ${cartItem?.length} items in your cart 
                  `
                : " Either You have no Items in the cart or Loading.."}
            </h4>
            { status ? <p>Status: <b>{status}</b></p> : "" }
          </div>
        </div>

        <div className="row">

                   {/* // we show loading... until we fetch all product */}
                   {loading && <div className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div>}
                   {error && <p>{error}</p>}
                   <p>Number of products found {totalNumberOfProducts}</p>
                 {totalNumberOfProducts !== 0 ? ( 
          <div className="col-md-8">

          
            {cartItem?.map((p, index) => (
              <div key={index} className="row mb-2 p-3 card flex-row">

                <div className="col-md-4">
                  <img
                    src={`${REACT_APP_API}/api/v1/product/product-photo/${p?._id}`}
                    className=" cart-image card-img-top"
                    alt={p?.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>Name: {p?.name}</p>
                  <p>Description: {p?.description?.substring(0, 30)}</p>
                  <p>Price: ${p?.price}</p>
                  <button className="btn btn-danger" onClick={() => removeCartItem(p?._id,auth?.user?._id)} >  Remove </button>
                </div>
              </div>
            ))}
          </div>
          ):(<><div className="col-md-8"><p>No product found</p></div></>)}
          <div className="col-md-4 text-center">
            <h2>Cart Items</h2>          
            <hr />
            <h4>Total Price : ${totalPrice()} </h4>           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;