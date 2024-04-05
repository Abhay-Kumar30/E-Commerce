import React from 'react';
import Layout from "../../components/Layout/Layout.js"
import UserMenu from '../../components/Layout/UserMenu.js';
import { useAuth } from '../../context/auth.js';

const Dashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Dashboard"}>

      <div className="container-fluid p-3 m-4">
        <div className="row">
            <div className="col-md-3">
                <UserMenu/>
            </div>
            <div className="col-md-9 mt-4">
               <div className="card w-75 p-3">
                  <h4> Name:    {auth?.user?.name}    </h4>
                  <h4> Email:   {auth?.user?.email}   </h4>
                  <h4> Address: {auth?.user?.address} </h4>
               </div>
            </div>
        </div>
      </div>
   
    </Layout>
  )
}

export default Dashboard
