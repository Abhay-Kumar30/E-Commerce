import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';
import { REACT_APP_API } from '../../context/helper';
const CreateCategory = () => {
  const [ categories, setCategories ]   = useState([]);
  const [ name, setName ]               =useState("");
  const [ visible, setVisible ]         = useState(false);
  const [ selected, setSelected ]       = useState(null);
  const [ updatedName, setUpdatedName ] = useState("");
 

  // handle form
   const handleSubmit = async (e)=>{

      // it help to prevent the refresh of page when we submit
      e.preventDefault();

      try{   const {data}= await axios.post(`${REACT_APP_API}/api/v1/category/create-category`,{name});
             if(data?.success){
                toast.success(`${name} is created`);
                getAllCategory();

                // empty the input field after click on submit
                setName("");

              }else{  toast.error(data?.message);  }

         }catch(error){
           toast.error("Something went wrong in input form");
         }
   }

  // get all categories
  const getAllCategory = async ()=>{
       try{  const {data}= await axios.get(`${REACT_APP_API}/api/v1/category/get-category`);
             if(data?.success){
                setCategories(data?.category);
               }
        }catch(error){
            toast.error('Something went wrong in getting category')
           }
  }

  // get all category when component run first time
  useEffect(()=>{
   getAllCategory();
  },[]);


// update category
const handleUpdate = async(e)=>{
  e.preventDefault();

  try{    const {data}= await axios.put(`${REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})
          if(data?.success){
            toast.success(`${updatedName} is updated`);
            setSelected(null);
            setUpdatedName("");

            // close the edit popup model on submit
            setVisible(false);

            // get the updated value of category
            getAllCategory();

        }else{ toast.error(data.message) }

      }catch(error){ toast.error('Something went wrong'); }

}


// delete category
const handleDelete = async(pId)=>{

  try{  const {data}= await axios.delete(`${REACT_APP_API}/api/v1/category/delete-category/${pId}` )
         if(data?.success){
           toast.success("category is deleted");

           // get the updated value of category
           getAllCategory();

         }else{  toast.error(data.message) }

      }catch(error){ toast.error('Something went wrong'); }

}

  return (
    <Layout title={"Dashboard - create cateGory"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">  <AdminMenu />  </div>
         <div className="col-md-9">

            <h1>Manage category</h1>

            <div className="p-3 w-50">

             <CategoryForm handleSubmit = {handleSubmit} value={name} setValue={setName} />
            </div>
            <div className="w-75">
            <table className="table">
                <thead>
                   <tr>    
                     <th scope="col">name</th>
                     <th scope="col">actions</th>
                   </tr>
                </thead>
                <tbody>
   
                     {categories?.map((c)=>(
        
                       <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>
                             <button 
                                className="btn btn-primary ms-2" 
                                onClick={()=> {
                                    setVisible(true);
                                    setUpdatedName(c.name);
                                    setSelected(c);            
                                  }} 
                              >             
                             Edit
                             </button>
                            <button className="btn btn-danger ms-2" onClick={()=> {handleDelete(c._id)}} >Delete</button>
                          </td>
                       </tr>
        
                      ))}
                </tbody>
            </table>

        </div></div>
        <Modal title="Your Modal Title" onCancel={()=> setVisible(false)} footer={null}  open = {visible} >
           <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>

      </div></div>
    </Layout>
  )
}

export default CreateCategory
