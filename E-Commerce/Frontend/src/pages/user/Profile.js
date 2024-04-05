import React,{useState,useEffect} from 'react';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { REACT_APP_API } from '../../context/helper';
const Profile = () => {

  // context
  const [auth,setAuth]=useAuth();

  // state
  const [ name, setName ]         = useState("");
  const [ email, setEmail ]       = useState("");
  const [ password, setPassword ] = useState("");
  const [ phone, setPhone ]       = useState("");
  const [ address, setAdderss ]   = useState("");


  // get user data and fill in input field already
useEffect(()=>{
  const {email,name,phone,address}=auth?.user;
  setName(name);
  setPhone(phone);
  setEmail(email);
  setAdderss(address);
},[auth?.user])

  // form function
const handleSubmit = async (e)=>{

  e.preventDefault();
  try{
    const {data} = await axios.put(`${REACT_APP_API}/api/v1/auth/profile`,{
      name:     name,
      email:    email,
      password: password,
      phone:    phone,
      address:  address,
     
    });

    // show "Success " message when we get data
    if(data?.error){
      toast.error(data?.error);
    }else{
 // we change the auth also
           // ...auth it means we kepp the old non updated data as it is
           // but we update the values if we prvide new values of auth property with the help of user:data?.updatedUser
           setAuth({...auth, user:data?.updatedUser});

           // we also have to update the local storage
           let ls= localStorage.getItem("auth")
               ls = JSON.parse(ls)
               ls.user = data.updatedUser
               localStorage.setItem('auth', JSON.stringify(ls));
               toast.success("Profile updated successfully")
        }
  }catch(err){ toast.error("Something went wrong"); }
 
}

  return (
    <Layout title={"your profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9">
            <div className='form-container d-flex flex-column'>
                <h2>User profile</h2>
                <form onSubmit={handleSubmit}>
                   {/* // name */}
                      <div className="mb-3">          
                        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="exampleInputName" placeholder='Enter your name' />          
                      </div>

                   {/* //  email */}
                      <div className="mb-3">        
                        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Email' disabled />          
                      </div>

                   {/* // Phone */}
                      <div className="mb-3">          
                        <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="form-control" id="exampleInputName" minLength="10" maxLength="10" placeholder='Enter your phone'/>           
                      </div>

                   {/* // Address */}
                      <div className="mb-3">         
                        <input type="text" value={address} onChange={(e)=>setAdderss(e.target.value)} className="form-control" id="exampleInputName" placeholder='Address' />
                      </div>

                   {/* // password */}
                      <div className="mb-3">
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" placeholder='New password' required />
                      </div>
         
                   <button type="submit" className="btn btn-primary"> Update </button>
               </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
