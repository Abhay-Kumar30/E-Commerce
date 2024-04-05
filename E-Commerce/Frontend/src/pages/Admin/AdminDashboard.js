import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import AdminMenu from '../../components/Layout/AdminMenu.js';
import { useAuth } from '../../context/auth.js';

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout>
      
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
                 <AdminMenu/>
          </div>
          <div className="col-md-9">
          <div className="card w-75 p-3">
            <h5> Name:  { auth?.user?.name  }  </h5>
            <h5> Email: { auth?.user?.email }  </h5>
            <h5> Phone: { auth?.user?.phone }  </h5>
          </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
