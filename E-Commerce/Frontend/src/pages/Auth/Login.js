import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import { REACT_APP_API } from '../../context/helper';

const Login = () => {

  const [ email, setEmail ]       = useState("");
  const [ password, setPassword ] = useState("");
  const [ auth, setAuth ]         =useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // form function
   const handleSubmit = async (e)=>{
     e.preventDefault();
  
     try{
          const res = await axios.post(`${REACT_APP_API}/api/v1/auth/login`,{email,password})
  
          // show "Success " message when we get data
          if(res && res?.data.success){

               // show success message
                  toast.success(res?.data.message);

                 setAuth({ ...auth, user: res?.data.user, token: res?.data.token});

               // store all data in local storage
               // we can store data in string format only
                 localStorage.setItem('auth', JSON.stringify(res?.data));

               // empty all the input field
                 setEmail(""); setPassword("");

                 


               // if "location.state" have some valuue then we redirect to the page where he came on this login page  home page(i.e at "location.state") 
               // otherwse we redirect to home page "/"
                 navigate(location.state || "/");
           }else{ toast.error("Something went wrong"); }

        }catch(err){ toast.error("Something went wrong"); }
   
     }
  

  return (
    <Layout title = {"Login"}>
         <div className = 'form-container d-flex flex-column formBox'>
        
         <form onSubmit = {handleSubmit} className='loginForm'>
         <h2>Login form</h2>
              {/* //  email */}
                 <div className = "mb-3">
                  <b><label htmlFor="email" className="form-label">Email</label></b>        
                   <input type = "email" value = {email} onChange = {(e)=>setEmail(e.target.value)} className="form-control" id="email" placeholder='Email' required />          
                 </div>
 
              {/* // password */}
                 <div className = "mb-3">
                 <b><label htmlFor="password" className="form-label">Password</label></b>  
                   <input type = "password" value = {password} onChange = {(e)=>setPassword(e.target.value)} className="form-control" id="password" placeholder='Password' required />
                 </div>
        
              <button type = "submit" className = "btn btn-primary">Login</button>
              <div className = "mb-3 ">
              <button type = "button" className = "btn btn-outline-secondary " onClick = {()=>{ navigate('/forgot-password')}}>Forgot password</button>
              </div>
         </form>

    </div>
   </Layout>
  )
}

export default Login
