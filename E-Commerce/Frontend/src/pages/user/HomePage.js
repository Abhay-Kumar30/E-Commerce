import React,{useState,useEffect} from "react";
import { useNavigate }            from "react-router-dom";
import { Checkbox } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import banner                     from "../../images/1.jpg";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../context/cart";
import { useAuth } from "../../context/auth";
import { REACT_APP_API } from "../../context/helper";

const HomePage = () => {
    const navigate=useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [ cart, setCart    ]=useCart();
    const [ auth, setAuth    ]=useAuth();
    const [totalNumberOfProducts,setTotalNumberOfProduct]=useState(0);

    const [AllCategories, setAllCategories]=useState([]);      
    const [AllPrice,setAllPrice]=useState([]);
    const [numberOfProductsPerPage,setNumberOfProductsPerPage]=useState("");
    const [TotalPages,setTotalPages]=useState(1);

    const [FilterCategories,setFilterCategories]=useState([]);
    const [FilterPrice,setFilterPrice]=useState([]);
    const [AllProducts,setAllProducts]=useState([]);   
    const [PageNumber,setPageNumber]=useState(1);

    const fetchData = () => {
      getMaximumNumberOfProductsPerPage();
      getAllCategory();
      getMaximumPriceOfProduct();
      getCartProduct();
      getAllProducts();
    };
    useEffect(()=>{
      fetchData();   
    },[]);

     // get all categories
     const getAllCategory = async ()=>{

        try{  const { data }= await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);       
                if(data?.success){ setAllCategories(data?.category);}
               
           }catch(error){
                 toast.error("Something went wrong");        
               }
         }

    // get maximum price of product
    const getMaximumPriceOfProduct =async () =>{
        try{
            const {data} = await axios.get(`${REACT_APP_API}/api/v1/product/maximum-price`);
            
             AllPrice[0]=0;
             AllPrice[1]=data?.maximumPrice;
            // setFilterPrice(0, data?.maximumPrice)
             FilterPrice[0]=0;
             FilterPrice[1]=data?.maximumPrice;

              // divive the maximum price to show the price range
              divideNumber();
           
           }catch(error){
              toast.error(error?.message);
           }
    }

    // get maximum number of products per page
    const getMaximumNumberOfProductsPerPage =async () =>{
      try{
           const {data} = await axios.get(`${REACT_APP_API}/api/v1/product/get-product-per-page`);
          
           setNumberOfProductsPerPage(data?.productPerPage);
         

          }catch(error){
          toast.error(error?.message);
         }
     }

   //get all products
   const getAllProducts = async () => {
        setLoading(true);
        try {
      
               // fetch only id from AllCategories
               let AllCategoriesNew = AllCategories.map((e)=>{ return e._id; });  

               const { data } = await axios.get(`${REACT_APP_API}/api/v1/product/get-product-new/${PageNumber}`, {
                params: {
                AllCategories: AllCategoriesNew,
                FilterCategories: FilterCategories,
                FilterPrice: FilterPrice,
                numberOfProductsPerPage: numberOfProductsPerPage
              }
            });
            
          if(data?.products.length===0){
              setAllProducts([]);     
              setTotalPages(0);
              setTotalNumberOfProduct(0);
          }else{
              setAllProducts(data?.products);     
              setTotalPages(data?.totalPages);
              setTotalNumberOfProduct(data?.totalNumberOfProducts);}
          
        } catch (error) {
      setError('Error fetching data');
        }
        setLoading(false);
        setError('');
  };
  

       //  filter by category
    const handleFilter =(value,id)=>{

       // if we check the checkbox the 'value' is true 
      // (if "value" is true it means we have to insert accepted "id" in "checked")
      // (if "value") is false the we have to remove the accepted "id" from checked array

      // if we uncheck the check box then 'value' is false
            // this function will run each time whenwe check or uncheck the category's checkbox
            // we store id of all those category which is checked

            // put all checked category in "all"
            let all =[...FilterCategories]; 
             // insert "id" in checked array          
            if(value){ 
                        all.push(id);
                        setPageNumber(1);
                        setFilterCategories(all); 
            
                      }else{       
                         // remove "id" from checked array               
                           all = all.filter( c => c !== id); }
                           setFilterCategories(all);
                           setPageNumber(1);                   
            }
         


// price range in radio buton
  const [ranges, setRanges] = useState([]);

  const divideNumber = () => {
    
    // AllPrice[0] is minium price of product
    // AllPrice[1] is maximum price of product

    // we always divide the maximum price in 4 radio button 

    const step = Math.floor(AllPrice[1] / 4);
    let rangeStart = 0;
    let rangeEnd = step;

    // if maxpeice is 20 then 20/4=5
    // it means every range is of 5 steps
    // i.e 0-5, 6-10, 11-15, 16-20

    // but if maximum price is 21 then 21/4 = 5.25( we dont show desimal number in range so we apply Math.floor and we get 5 as output)
    // in the case where we get the float number after divide maximum price we will show "or more" text in the maximum part of last radio button
    // in this case range  will be 0-5, 6-10, 11-15, 16-or more

      const dividedRanges = Array.from({ length: 4 }, (_, index) => {
         const min = rangeStart;
         const max = index === 3 ? 'or more' : rangeEnd;
         rangeStart = rangeEnd + 1;

         if (index !== 3) {
          rangeEnd += step;
          }
         return { min, max };
    });

    setRanges(dividedRanges);
  };

  // change price filter
  const abc = (a,b)=>{
    // FilterPrice[0]=a;
    // FilterPrice[1]=b;
    // range.max === 'or more' ? AllPrice[1] : range.max
   let maxPrice=  b === 'or more' ? AllPrice[1] : b
   FilterPrice[0]=a;
   FilterPrice[1]=maxPrice;
  //  setFilterPrice([a, b]);
  setPageNumber(1);
   getAllProducts();   
  }
 ///....................
   // Replace this with the total number of pages you have
  
  const handlePageChange = (page) => {
    setPageNumber(page);
    
  };

       useEffect(()=>{
        getAllProducts();
       },[PageNumber,AllCategories,FilterCategories,FilterPrice,numberOfProductsPerPage ]);



       //  add to cart
   const addToCart = async(product,buyerID)=>{
    try{
           const {data} =await axios.post(`${REACT_APP_API}/api/v1/cart/cart-product/${product?._id}/${buyerID}`)
           
           toast.success(data?.message)
           
           }catch(error){
           toast.error(error?.message);
         }
           // add products in local storage
           setCart([...cart,product]);                              
           localStorage.setItem("cart", JSON.stringify([...cart,product]));
           toast.success('Item added to cart');    
        }

        const getCartProduct = async() => {         
          try{  
                const {data} = await axios.get(`${REACT_APP_API}/api/v1/cart/single-cart-product/${auth?.user?._id}`)
              
                  // add already added cart products in local storage after login
                  setCart([...data?.wholeCart?.products]);                              
                  localStorage.setItem("cart", JSON.stringify([...data?.wholeCart?.products]));
          
                  }catch(error){                   
                   toast.success("wait");
                  }
              }
            
  return (
    <Layout title={"All products-best offer"}>

        <div className="banner-box "> <img src={banner} alt="" className="bannerImage"/> </div>
        <div className="row mt-3 xx">
        
            <div className="col-md-2 mt-4">
            
               <h5 className="text-center">Filter by category</h5>
               <div className="d-flex flex-column all-categories">
               <ul>
                   {  AllCategories?.map((c)=>(
                       // onChange means when we click on checkbox
                       <Checkbox key={c?._id} onChange={(e)=> handleFilter(e.target.checked, c?._id)} >  {c?.name} </Checkbox>
                        ))
                   }
               </ul> 
               </div>

                 {/* // price filter */}
             <h5 className="text-center mt-4">Filter by price</h5>
             <div className="d-flex flex-column price-filter">

             <div className="d-flex flex-column">
                   {ranges?.map((range, index) => (
                     <label key={index}>
                       <input
                         type="radio"
                         name="ranges"
                         value={`${range?.min}-${range?.max}`}
                         onChange={() => abc(range?.min, range?.max)}
                       />
                       {` ${range?.min} - ${range?.max}`}
                     </label>
                   ))}
             </div>
             </div>

            
            </div>

            <div className="col-md-9 ">
           
                <h3 className="text-center">ALL PRODUCTS</h3>
                <p className="text-end">Selected Page: {PageNumber}</p>
                {/* // we show loading... until we fetch all product */}
                 {loading && <div className="spinner-border " role="status"><span className="visually-hidden">Loading...</span></div>}
                 {error && <p>{error}</p>}
                 <p>Number of products found {totalNumberOfProducts}</p>
                 
                 <ul className="pagination">
                    {Array.from({ length: TotalPages }, (_, index) => (
                      <li key={index + 1} className={`page-item ${PageNumber === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                 {totalNumberOfProducts !== 0 ? (           
                   
                <div className="d-flex justify-content-center flex-wrap homeProducts">
                 
                  {AllProducts?.map((p) => (
                     
                         <div key={p?._id} className="card m-2 homeCard" style={{ width: '15rem', height: 'fit-content' }} >
                           <img src={`${REACT_APP_API}/api/v1/product/product-photo/${p?._id}`} className="product-image card-img-top" alt={p?.name} />
                           <div className="card-body">
                              <h5 className="card-title"> <i>{p?.name}</i> </h5>                            
                              <p className="card-text"> <i>${p?.price}</i> </p>
                                                                                      
                                {AllCategories?.map((e,index)=>(                 
                                    e._id===p?.category ? <p key={index} className="card-text"> <i>{e.name}</i></p> :""                             
                                ))}   

                              <button className="btn btn-primary ms-1 homeButton" onClick={()=> navigate(`/product/${p.slug}`)}>More details</button>                                                      
                              <button className="btn btn-secondary ms-1 homeButton" disabled={!auth || !auth.user || !auth.user._id} onClick={() => addToCart(p, auth?.user?._id)} > Add to cart </button>           
                           </div>           
                         </div>

                    ))}
                </div>
                ):(<></>)}
               
            </div>
        </div>
    
    </Layout>
  )
}
export default HomePage

