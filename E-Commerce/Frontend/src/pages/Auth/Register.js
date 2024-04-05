import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API } from '../../context/helper';
const Register = () => {

  const [name,setName]         = useState("");
  const [email,setEmail]       = useState("");
  const [password,setPassword] = useState("");
  const [phone,setPhone]       = useState("");
  const [address,setAdderss]   = useState("");
  const [answer,setAnswer]   = useState("");
  const navigate = useNavigate();

// form function
const handleSubmit = async (e)=>{
  e.preventDefault();

  try{
        const res = await axios.post(`${REACT_APP_API}/api/v1/auth/register`,{
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
          answer: answer,
        })

        // show "Success " message when we get data
        if(res && res?.data.success){
          toast.success(res.data.message);
          // empty all the input field
          setName(""); setEmail(""); setPassword(""); setPhone(""); setAdderss("");
          navigate("/login");
        }else{ toast.error(res.data.message); }
      }catch(err){ toast.error("Something went wrong"); }
    }
  
  return (

    <Layout title={"Register"}>
     <div className='form-container d-flex flex-column formBox '>
    
      <form onSubmit={handleSubmit} className='loginForm'>
      <h2>Registration form</h2>
         {/* // name */}
            <div className="mb-3">  
           <b> <label htmlFor="email" className="form-label">Name</label> </b>       
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder='Enter your name' required />          
            </div>

         {/* //  email */}
            <div className="mb-3">  
            <b><label htmlFor="email" className="form-label">Email address</label> </b>     
              <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="email" placeholder='Email' required />          
            </div>

         {/* // Phone */}
            <div className="mb-3"> 
            <b><label htmlFor="phone-number" className="form-label">Phone number</label> </b>        
              <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} minLength="10" maxLength="10" className="form-control" id="phone-number" placeholder='Phone number' required/>           
            </div>
            
      
         {/* // Address */}
            <div className="mb-3">      
            <b><label htmlFor="adderss" className="form-label">Address</label>  </b> 
              <input type="text" value={address} onChange={(e)=>setAdderss(e.target.value)} className="form-control" id="adderss" placeholder='Address' required />
            </div>

            {/* // Answer */}
            <div className="mb-3"> 
            <b><label htmlFor="what-is-your-favourite-sports" className="form-label">What is your favourite sports</label></b>        
              <input type="text" value={answer} onChange={(e)=>setAnswer(e.target.value)} className="form-control" id="what is your favourite sports" placeholder='what-is-your-favourite-sports' required />
            </div>

         {/* // password */}
            <div className="mb-3">
            <b><label htmlFor="password" className="form-label">Password</label></b>
              <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="password" placeholder='Password' required />
            </div>
         
         <button type="submit" className="btn btn-primary">Submit</button>
     </form>

     </div>
    </Layout>
  )
}

export default Register
