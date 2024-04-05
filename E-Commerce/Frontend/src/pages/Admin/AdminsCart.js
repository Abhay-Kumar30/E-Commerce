import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import './style.css';
import { REACT_APP_API } from '../../context/helper';
const AdminsCart = () => {
    const [allCart,setAllCart]=useState([]);
    
    // accordion
    const [openAccordion, setOpenAccordion] = useState(null);
    const handleAccordionClick = (index) => {setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));};

    // change the status  of cart
    const handleCartStatus = async(personId,newStatus) => {
      try{
            const {data}=await axios.put(`${REACT_APP_API}/api/v1/cart/change-cart-status/${personId}`, { status: newStatus });
            toast.success(data?.message);
    
            getAllCart();
           }catch(error){
            toast.error("Something went wrong");
           }
          };

    useEffect(()=>{
       getAllCart();
    },[])

    const getAllCart = async()=>{
           try{
                const { data } = await axios.get(`${REACT_APP_API}/api/v1/cart/all-cart-product`);
                setAllCart(data?.cart);            
                toast.success(data?.message);
        
              }catch(error){ toast.error("Something went wrong");  }
         }
   
  return (
    <Layout title={"Dashboard - All carts"}>
      <div className="container-fluid m-3 p-3 ">
      <div className="row">

        <div className="col-md-3">
          <AdminMenu/>
        </div>

        <div className="col-md-9">
            <h1>All Carts</h1>       
            <p>`Total <b>{allCart?.length}</b> person have added products in cart`</p> 
 
            <div className="accordion">
                  {allCart?.map((item, index) => (
                    <div key={index} className="accordion-item">
        
                      <button className={`accordion-header ${openAccordion === index ? 'active' : ''}`} onClick={() => handleAccordionClick(index)}><p>{index+1}=</p>
                        <span>Total <b>{item.products.length} products</b>  added by <b>{item.user.name}</b>....<i>Email:- <b>{item.user.email}</b></i></span>         
                        <p>Status <b>{item?.status}</b> </p>
             
                        <div className="container mt-3">
      
                           <div className="dropdown">
                               <button
                                 className="btn btn-secondary dropdown-toggle"
                                 type="button"
                                 id="dropdownMenuButton"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                               >
                                 Select an status
                               </button>
                               <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li>
                                       <a className="dropdown-item" href="#" onClick={() => handleCartStatus(item.user._id,'Not Process')}> Not Process </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={() => handleCartStatus(item.user._id,'Processing')}>
                                           Processing
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#" onClick={() => handleCartStatus(item.user._id,'Shipped')}>
                                          Shipped
                                        </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item" href="#" onClick={() => handleCartStatus(item.user._id,'delivered')}>
                                          delivered
                                      </a>
                                    </li>
                                </ul>
                               </div>
                             </div>           
                    </button>
                    <div
                          className={`accordion-content ${openAccordion === index ? 'open' : ''}`}
                          style={{
                            maxHeight: openAccordion === index ? '1000px' : '0',
                            transition: 'max-height 0.3s ease',
                          }}
                      >
                    <table className="table table-striped table-hover">
                        <thead>
                             <tr>
                              <th scope="col">S.No.</th>
                              <th scope="col">Photo</th>
                              <th scope="col">Name</th>
     
                              <th scope="col">Price</th>
                              <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                               {item?.products?.map((eachProduct,index)=>(
                               <tr key={index+1}>
                                 <th scope="row">{index + 1}</th>
                                 <td><img src={`${REACT_APP_API}/api/v1/product/product-photo/${eachProduct?._id}`}  className="card-img-top cart-images" alt={eachProduct?.name} /></td>
                                 <td>{eachProduct?.name}</td>  
                                 <td>{eachProduct?.price}</td>
                                 <td>{eachProduct?.description}</td>
                                </tr>
                              ))}   
                      </tbody>
                   </table>
          </div>
        </div>
      ))}
    </div> 
        </div>

      </div>
      </div>
    </Layout>
  )
}

export default AdminsCart
