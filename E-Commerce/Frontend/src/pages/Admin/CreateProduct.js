import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API } from '../../context/helper';
// with the help of "Option" we can create dropdown menu
const {Option}=Select

const CreateProduct = () => {
  const navigate=useNavigate();
  const [ categories, setCategories]  = useState([]);
  const [ name, setName]              = useState("");
  const [ description, setDescription]= useState("");
  const [ price, setPrice]            = useState("");
  const [ category, setCategory]            = useState("");
  const [ quantity, setQuantity]      = useState("");
  const [ photo,setPhoto]      = useState("");
  const [ shipping, setShipping]      = useState("");
  
  // get all category
  const getAllCategory = async ()=>{
    try{  const {data}= await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
           if(data?.success){
             setCategories(data?.category);
           }

    }catch(error){
         
         toast.error('Something went wrong in getting category')
       }
  }

  useEffect(()=>{
    getAllCategory();
   },[]);

   // create product
   const handleCreate = async (e)=>{
    e.preventDefault();
     try{
// there is default browser property of "formData" (i.e we can get all data present in the form)
        

          const productData = new FormData()
          
          productData.append("name",name)
          productData.append("description",description)
          productData.append("price",price)

          productData.append("quantity",quantity)
          productData.append("photo",photo   )
          productData.append("category",category)

          const {data}=axios.post(`${REACT_APP_API}/api/v1/product/create-product`,productData);                               
               toast.success(data?.message);
               navigate('/dashboard/admin/products');
 
             
                    }catch(error){
       
                       toast.error(error?.message);
               }
         };
  return (
    <Layout title={"Dashboard - create- product"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu/>
        </div>
        <div className="col-md-9">
        <h1>Create product</h1>
        
        <div className="m-1 w-75">
           <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}>
            {categories?.map((c)=>(
              <Option key={c._id} value={c._id}>
                  {c.name}
              </Option>
             ))}
           </Select>

           <div className='mb-3'>

           {/* // accept='image/*' it means we accept only "image" ....and.... /* means we accept image of any type  */}
            <label className='btn btn-outline-secondary col-md-12'>
               {photo ? photo.name: "Upload Photo (max. size 1mb)" }
               <input type="file" name="photo" accept='image/*' onChange={(e)=> setPhoto(e.target.files[0])} hidden />
            </label>
           </div>
           <div className='mb-3'>
            {photo && (
              <div className='text-center'>
 {/* // by using the browser property, we take the photo from the url parameter and show as preview*/}
              {/* This URL points to an object created by the browser representing the contents of the photo object. As a result, the image specified by photo is displayed in this img tag. */}
              {/* The photo variable might hold a file */}
              <img src={URL.createObjectURL(photo)} alt=" product_photo" height={'200px'}  className='img img-responsive'/>
            </div>
            )}
           </div>

           <div className="mb-3">
             <input type="text" value={name} className="form-control" placeholder="name" onChange={(e)=> setName(e.target.value)} />
           </div>

           <div className="mb-3">
             <textarea type="text" value={description} className="form-control" placeholder="write a discription" onChange={(e)=> setDescription(e.target.value)} />
           </div>

           <div className="mb-3">
             <input type="number" value={price} className="form-control" placeholder="write a price" onChange={(e)=> setPrice(e.target.value)} />
           </div>

           <div className="mb-3">
             <input type="number" value={quantity} className="form-control" placeholder="write a quantity" onChange={(e)=> setQuantity(e.target.value)} />
           </div>

          

           <div className="mb-3">
            <button className="btn btn-primary" onClick={handleCreate}>create product</button>
           </div>

        </div>
        </div>

      </div>
      </div>
    </Layout>
  )
}

export default CreateProduct
