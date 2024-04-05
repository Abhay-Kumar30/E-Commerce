import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <>
   <div className="text-center mt-3 ">
   <div className="list-group">

 <h1>Admin panel</h1>
 
  <NavLink to = "/dashboard/admin/create-category"        className = "list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to = "/dashboard/admin/create-product"         className = "list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to = "/dashboard/admin/products"               className = "list-group-item list-group-item-action"> Products</NavLink>
  <NavLink to = "/dashboard/admin/users"                  className = "list-group-item list-group-item-action">NO. of Users</NavLink>
  <NavLink to = "/dashboard/admin/admins"                 className = "list-group-item list-group-item-action">NO. of Admins</NavLink>
  <NavLink to = "/dashboard/admin/cart-items"             className = "list-group-item list-group-item-action">Cart Items</NavLink>
  <NavLink to = "/dashboard/admin/products-per-page"      className = "list-group-item list-group-item-action">Set no. of products to show per page</NavLink>
</div>
   </div>

    </>
  )
}

export default AdminMenu
