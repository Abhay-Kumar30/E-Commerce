import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { REACT_APP_API } from '../../context/helper';
const Users = () => {

    const [allUsers,setAllUsers]=useState([]);
    
    useEffect(()=>{ getAllUsers(); },[])

    // get all users
    const getAllUsers = async()=>{
        try{
              const { data } = await axios.get(`${REACT_APP_API}/api/v1/auth/all-users`);
              setAllUsers(data?.users);
          
            }catch(error){ toast.error("Something went wrong"); }
       }

       // change role
    const handleRoleChange = async(personId) => {
        try{
             const { data } = await axios.put(`${REACT_APP_API}/api/v1/auth/change-role/${personId}`);        
             toast.success(data?.message)
             getAllUsers();

            }catch(error){ toast.error("Something went wrong") }
      };
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid m-3 p-3">
       <div className="row">
         <div className="col-md-3">
           <AdminMenu/>
         </div>

        <div className="col-md-9">
          <h1>Users</h1>       
          <p>`Total {allUsers?.length} is/are users available`</p>
          <table className="table table-striped table-hover">
             <thead>
               <tr>
                 <th scope="col"> S.No.   </th>
                 <th scope="col"> Name    </th>
                 <th scope="col"> Email   </th>
                 <th scope="col"> Phone   </th>
                 <th scope="col"> Address </th>
                 <th scope="col"> Role    </th>
               </tr>
             </thead>

            <tbody>
              {allUsers?.map((p, index) => (
                <tr key={p?._id}>
                  <th scope="row">{index + 1}</th>
                  <td> {p?.name}    </td>
                  <td> {p?.email}   </td>
                  <td> {p?.phone}   </td>
                  <td> {p?.address} </td>
      
                  <td> <select onChange={() => handleRoleChange(p?._id)} value={ p?.role ? "admin" : "user" }>
                    <option value="admin"> Admin </option>
                    <option value="user">  User </option>       
                  </select></td>
                </tr>
               ))}
             </tbody> 
          </table>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Users

