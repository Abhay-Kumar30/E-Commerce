import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { REACT_APP_API } from '../../context/helper';
const ForgotPassword = () => {
    
  const [email,setEmail]             = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [answer,setAnswer]           = useState("");
  const navigate                     = useNavigate();

  // form function
   const handleSubmit = async (e)=>{
     e.preventDefault();
  
     try{
            // we pass the "email", "answer", "newPassword" to the server
            const res = await axios.post(`${REACT_APP_API}/api/v1/auth/forgot-password`,{
                  email      : email,
                  answer     : answer,
                  newPassword: newPassword,          
              })
  
          // show "Success " message when we get data
          if(res && res.data.success){

             // show success message
                 toast.success(res.data.message);
               
             // empty all the input field
                 setEmail(""); setNewPassword(""); setAnswer("");
                 navigate("/login");

             }else{ toast.error(res.data.message); }
        }catch(err){ toast.error("Something went wrong"); }
   
     }
  
  return (
    <Layout title={"Forgot-password"}>
      <div className='form-container d-flex flex-column'>

         <h2>Reset Password</h2>
         <form onSubmit={handleSubmit}>

              {/* //  email */}
                 <div className="mb-3">        
                   <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email' required />          
                 </div>
 
              {/* // answer */}
                <div className="mb-3">
                  <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='Enter your favourite sports name' required />
                </div>

              {/* // password */}
                 <div className="mb-3">
                   <input type="password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='New password' required />
                 </div>

                 <button type="submit" className="btn btn-primary">Reset</button>                        
          </form>
       </div>
    </Layout>
  )
}

export default ForgotPassword
